import { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import FocusTrap from 'focus-trap-react';
import { useAuth0, useModel, useToggle } from 'src/lib/hooks';
import { Icon, Modal, Button } from 'src/common';

import classNames from 'tailwindcss-classnames';
import styles from './Header.module.css';

const TooltipPortal = ({ children }) =>
  ReactDOM.createPortal(children, document.querySelector('body'));

const NavLink = ({ label, icon, href, size, ...props }) => (
  <Button
    variant="small"
    color="transparent"
    onClick={() => {}}
    aria-label={label}
    className={styles.navOption}
    {...props}
  >
    {icon && <Icon name={icon} size={size} className="mr-2" />}
    <span>{label}</span>
  </Button>
);

const NavActions = () => {
  const history = useHistory();
  const { logout, user } = useAuth0();
  const btnRef = useRef(null);
  const tooltipRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [showLogOutModal, toggleLogOutModal] = useToggle(false);
  const [showHelpModal, toggleHelpModal] = useToggle(false);
  const fnol = useModel.fnol();
  const location = useLocation();

  const goToCancel = () => {
    history.push('/cancel');
    handleClose();
  };

  const handleStartOver = () => {
    logout();
  };

  const handleOpen = (open) => {
    setOpen(open);
  };

  const handleClose = () => {
    if (tooltipRef && tooltipRef.current) {
      // Why this? https://github.com/wwayne/react-tooltip/issues/449
      tooltipRef.current.tooltipRef = null;
    }
    ReactTooltip.hide();

    if (btnRef && btnRef.current) {
      btnRef.current.focus();
    }
  };

  useEffect(() => {
    const onKeyup = (e) => {
      if (open && e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [open]);

  useEffect(() => {
    if (open && (showHelpModal || showLogOutModal)) {
      handleClose();
    }
  }, [open, showHelpModal, showLogOutModal]);

  return (
    <>
      <div>
        <button
          type="button"
          data-event="click"
          data-for="header-tooltip"
          data-tip="header-tooltip"
          aria-label="menu"
          aria-controls="header-tooltip"
          ref={btnRef}
          aria-expanded={open ? true : false}
        >
          <Icon name="menu" size="27" />
        </button>
        <TooltipPortal>
          <FocusTrap active={open}>
            <div>
              <ReactTooltip
                id="header-tooltip"
                place="bottom"
                effect="solid"
                event="click"
                arrowColor="transparent"
                borderColor="transparent"
                multiline
                clickable
                afterShow={() => handleOpen(true)}
                afterHide={() => handleOpen(false)}
                ref={tooltipRef}
                role="dialog"
                aria-modal="true"
                offset={{ left: 75 }}
                backgroundColor="transparent"
                className={styles.tooltipContainer}
              >
                <div className={styles.navLinkContainer}>
                  {location.pathname === '/submit' && (
                    <NavLink
                      label="Start Over"
                      icon="StartOver"
                      size={22}
                      onClick={toggleLogOutModal}
                    />
                  )}
                  <NavLink
                    label="Help"
                    icon="questionCircleUnfilled"
                    size={22}
                    onClick={toggleHelpModal}
                  />
                  {user?.hasSession &&
                    fnol &&
                    fnol.status === 'In Progress' && (
                      <NavLink
                        label="Cancel"
                        icon="timesCircle"
                        size={22}
                        onClick={goToCancel}
                      />
                    )}
                </div>
              </ReactTooltip>
              <button
                tabIndex={-1}
                aria-hidden="true"
                onClick={handleClose}
                className={classNames(styles.closeButton, {
                  [styles.visibleButton]: open,
                  [styles.invisibleButton]: !open,
                })}
              />
            </div>
          </FocusTrap>
        </TooltipPortal>
      </div>
      {showLogOutModal && location.pathname === '/submit' && (
        <Modal
          showModal={showLogOutModal}
          enableCloseButton
          onClose={toggleLogOutModal}
          ariaLabel="Confirmation"
        >
          <div className={styles.modalContent}>
            <h4 className={styles.title}>Are you sure?</h4>
            <div className={styles.buttonsModal}>
              <Button color="water" onClick={toggleLogOutModal} type="button">
                Cancel
              </Button>
              <Button color="navy" onClick={handleStartOver} type="button">
                Start Over
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {showHelpModal && (
        <Modal
          showModal={showHelpModal}
          enableCloseButton
          onClose={toggleHelpModal}
          ariaLabel="Need Help?"
        >
          <div className={styles.modalContent}>
            <h2>Need Help?</h2>
            <div>
              <p className={styles.paragraph}>
                If you would like to contact us about your claim, please call us
                at the number below during business hours.
              </p>
              <p className={styles.paragraph}>Phone 888-256-3378</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default NavActions;
