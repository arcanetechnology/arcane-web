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
    <Modal size="small" toggleModal={toggleModal} isOpen={isOpen()}>
      <article class="align-center gap-big">
        <div class="align-row gap-small">
          <Show when={showBreakDown()}>
            <Button onClick={(e) => setShowBreakDown(false)}>
              <Back />
            </Button>
          </Show>
          <p class="heading8">Cookie Settings</p>
        </div>
        <div class="align-vertical gap-big">
          <div class="align-vertical gap-default w-full">
            <p class="body3">
              We use cookies in order to give you the best experience possible
              while visiting our website. Some of them are essential, others are
              optional. We won’t turn them on unless you accept.
              <a href="https://arcane.no/cookies">Learn more about them</a>
            </p>
            <Show when={showBreakDown()}>
              <div>
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

          <div
            class="w-full align-row"
            style={{ bottom: 0, position: 'relative' }}
          >
            <Show
              when={showBreakDown()}
              fallback={
                <Button
                  variant="secondary"
                  onClick={(e) => setShowBreakDown(true)}
                >
                  Manage Cookies
                </Button>
              }
            >
              <Button variant="secondary">Cancel</Button>
            </Show>
            <div style={{ 'flex-grow': 1 }} />
            <Button variant="primary" onClick={() => handleCookies()}>
              Allow Cookies
            </Button>
          </div>
        </div>
      </article>
    </Modal>
  );
};

export default Cookie;
