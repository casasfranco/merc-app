import { api } from '../lib/hooks/useApi/useApi';
import axios from 'axios';

const fnol = {
  state: null,
  reducers: {
    set: (_, updatedClaim) => updatedClaim,
    setAttachments: (state, attachments) => ({ ...state, attachments }),
    'global/reset': () => null,
  },
  effects: (dispatch) => ({
    create: async (details) => {
      const { data } = await api.secure.post('/FNOL', details);
      dispatch.fnol.set({ ...details, ...data });
    },
    verifyPolicy: async (details) => {
      const { data } = await api.post('/FNOL', details);
      dispatch.fnol.set(data);
    },
    update: async (
      { updates, page, pageIndex, waitForUpdate = true },
      root
    ) => {
      const { fnolId, causeOfLoss, typeOfLoss } = root.fnol;
      const { furthestIndex, skipList } = root.session;

      const isDisclosureAcknowledged =
        root.fnol.isDisclosureAcknowledged ??
        root.session.pendingChanges.isDisclosureAcknowledged;

      const session = { page, pageIndex };
      const body = {
        causeOfLoss,
        typeOfLoss,
        ...updates,
        resumeFrom: page,
        skipList,
        isDisclosureAcknowledged,
      };

      if (furthestIndex < pageIndex) {
        body.furthestReached = page;
        session.furthestIndex = pageIndex;
      } else if (furthestIndex >= pageIndex) {
        body.furthestReached = root.fnol.furthestReached;
      }

      if (!waitForUpdate) {
        dispatch.session.setSession(session);
      }

      const { data } = await api.secure.patch(`/FNOL/${fnolId}`, body);

      if (!!body.causeOfLoss && body.causeOfLoss !== root.fnol.causeOfLoss) {
        data.damages = null;
      }

      dispatch.fnol.set(data);
      if (waitForUpdate) {
        dispatch.session.setSession(session);
      }
    },
    submit: async (_, { fnol }) => {
      const { fnolId } = fnol;
      const { data } = await api.secure.patch(`/FNOL/${fnolId}/enqueue`);
      dispatch.fnol.set(data);
    },
    resume: async (_, { session }) => {
      const { fnolId } = session;
      const { data } = await api.secure.get(`/FNOL/${fnolId}`);
      if (data.status !== 'New' && data.status !== 'In Progress') {
        const error = { invalidFnolStatus: data.status };
        throw error;
      }
      dispatch.fnol.set(data);
      dispatch.session.setSession({
        furthestReached: data.furthestReached,
        page: data.resumeFrom,
        skipList: data.skipList,
      });
    },
    getAttachmentsUrl: async (attachments, { fnol }) => {
      const { fnolId, attachments: previousFiles } = fnol;

      const filesToUpload = attachments
        .filter((a) => !previousFiles?.find((d) => d.fileName === a.fileName))
        .map((f) => ({ fileName: f.fileName }));

      if (!!filesToUpload?.length) {
        const { data } = await api.secure.post(`/FNOL/${fnolId}/attachments`, {
          attachments: filesToUpload,
        });

        return data?.attachments?.map((a) => ({
          ...attachments?.find(
            (f) => f.fileName?.toLowerCase() === a.fileName?.toLowerCase()
          ),
          fileUrl: a.fileUrl,
        }));
      }
      return [];
    },
    uploadAttachment: async ({ file, fileName, fileUrl }, { fnol }) => {
      await axios.put(fileUrl, file, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'x-ms-blob-type': 'BlockBlob',
        },
      });
      dispatch.fnol.setAttachments([
        ...(fnol?.attachments || []),
        { fileName, fileUrl },
      ]);
    },
    deleteAttachment: async ({ fileName }, { fnol }) => {
      const { fnolId, attachments } = fnol;
      await api.secure.delete(`/FNOL/${fnolId}/attachments`, {
        data: { attachments: [{ fileName }] },
      });
      dispatch.fnol.setAttachments(
        attachments.filter((a) => a.fileName !== fileName)
      );
    },
    cancel: async (_, { fnol }) => {
      const { fnolId } = fnol;
      await api.secure.patch(`/FNOL/${fnolId}/cancel`);
    },
  }),
};

export default fnol;
