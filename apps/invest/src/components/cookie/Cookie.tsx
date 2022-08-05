/**
 * /* eslint-disable @typescript-eslint/ban-ts-comment
 *
 * @format
 */

/** @format */

import { Button, Modal, Toggle } from '@arcane-web/alchemy-solid';
import { createLocalStorage } from '@solid-primitives/storage';
import { createEffect, createSignal, Show, VoidComponent } from 'solid-js';
import Back from '../../assets/back.svg';
import './Cookie.scss';

const Cookie: VoidComponent = () => {
  const [storage, setStorage] = createLocalStorage();
  const [isOpen, setModal] = createSignal(false);
  const [showBreakDown, setShowBreakDown] = createSignal(false);
  const [productDevCookie, setProductDevCookie] = createSignal(true);
  const toggleModal = (open: boolean) => setModal(open);

  createEffect(() => {
    if (!storage['cookieChoice']) {
      setModal(true);
    }
  });

  const handleCookies = () => {
    setStorage(
      'cookieChoice',
      JSON.stringify({
        productDevCookie: productDevCookie() ? 'YES' : 'NO',
      })
    );
    window['dataLayer'] = window['dataLayer'] || [];
    window['dataLayer'].push('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'granted',
    });
    setModal(false);
  };

  return (
    <Modal
      icon={() => <div />}
      size="small"
      toggleModal={toggleModal}
      isOpen={isOpen()}
    >
      <article class="modal-content">
        <div class="align-row gap-small modal-title">
          <Show when={showBreakDown()}>
            <Button onClick={(e) => setShowBreakDown(false)}>
              <img src={Back} alt="back-icon" />
            </Button>
          </Show>
          <p class="heading8">Cookie Settings</p>
        </div>
        <div class="modal-form">
          <div class="cookie-main">
            <div class="onboarding-main padding-32">
              <p class="body3">
                We use cookies in order to give you the best experience possible
                while visiting our website. Some of them are essential, others
                are optional. We won’t turn them on unless you accept.
                <a href="https://arcane.no/cookies">Learn more about them</a>
              </p>
              <Show when={showBreakDown()}>
                <div class="padding-16">
                  <div class="align-row">
                    <p class="body1">Strictly Necessary</p>
                    <div style={{ 'flex-grow': 1 }} />
                    <Toggle defaultChecked disabled />
                  </div>
                  <p class="small">
                    These cookies are necessary for our website to function
                    properly and can’t be disabled.
                  </p>
                </div>
                <div>
                  <div class="align-row">
                    <p class="body1">Product Development</p>
                    <div style={{ 'flex-grow': 1 }} />
                    <Toggle
                      defaultChecked={productDevCookie()}
                      onChange={(s) => {
                        setProductDevCookie(!s);
                      }}
                    />
                  </div>
                  <p class="small">
                    These cookies are necessary for our website to function
                    properly and can’t be disabled.
                  </p>
                </div>
              </Show>
            </div>
          </div>
        </div>
        <div class="cookie-footer modal-horizontal gap-big w-full">
          <Show
            when={showBreakDown()}
            fallback={
              <Button
                variant="secondary"
                size="medium"
                onClick={() => setShowBreakDown(true)}
              >
                Manage Cookies
              </Button>
            }
          >
            <Button
              onClick={() => toggleModal(false)}
              size="medium"
              variant="secondary"
            >
              Cancel
            </Button>
          </Show>
          <Button
            variant="primary"
            size="medium"
            onClick={() => handleCookies()}
          >
            Allow Cookies
          </Button>
        </div>
      </article>
    </Modal>
  );
};

export default Cookie;
