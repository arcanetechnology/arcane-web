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
import cookie from '../../assets/cookie.svg';
import switchDisabled from '../../assets/switchDisabled.svg';
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
      <article class="arcane-cookie">
        <div class="arcane-cookie-title">
          <Show
            when={showBreakDown()}
            fallback={<img src={cookie} width={40} height={40} />}
          >
            <Button onClick={(e) => setShowBreakDown(false)}>
              <img src={Back} alt="back-icon" />
            </Button>
          </Show>
          <p class="heading7">Cookie Settings</p>
        </div>
        <div class="arcane-cookie-content">
          <p class="body1 arcane-content-text">
            We use cookies in order to give you the best experience possible
            while visiting our website. Some of them are essential, others are
            optional. We won’t turn them on unless you accept.{' '}
            <a class="link-underline" href="https://arcane.no/cookies">
              Learn more about
            </a>
          </p>

          <Show when={showBreakDown()}>
            <div class="arcane-cookie-options">
              <div class="arcane-cookie-option">
                <div class="cookie-option-text">
                  <p class="body1">Strictly Necessary</p>
                  <p class="small description">
                    These cookies are necessary for our website to function
                    properly and can’t be disabled.
                  </p>
                </div>
                <div>
                  {/* <Toggle defaultChecked disabled /> */}
                  <img src={switchDisabled} />
                </div>
              </div>
              <div
                class="arcane-cookie-option"
                style={{ 'padding-top': '16px' }}
              >
                <div class="cookie-option-text">
                  <p class="body1">Product Development</p>
                  <p class="small description">
                    These cookies help us understand how people use our website
                    and help us make it better.
                  </p>
                </div>
                <div>
                  <Toggle
                    defaultChecked={productDevCookie()}
                    onChange={(s) => {
                      setProductDevCookie(!s);
                    }}
                  />
                </div>
              </div>
            </div>
          </Show>
        </div>
        <div class="arcane-cookie-footer">
          <Show
            when={showBreakDown()}
            fallback={
              <Button
                class="arcane-cookie-button"
                variant="secondary"
                size="medium"
                onClick={() => setShowBreakDown(true)}
              >
                <p class="body1">Manage Cookies</p>
              </Button>
            }
          >
            <Button
              class="arcane-cookie-button"
              onClick={() => toggleModal(false)}
              style={{ width: '90px' }}
              size="medium"
              variant="secondary"
            >
              Cancel
            </Button>
          </Show>
          <Button
            class="arcane-cookie-button"
            variant="primary"
            size="medium"
            onClick={() => handleCookies()}
          >
            <p class="body3">Allow Cookies</p>
          </Button>
        </div>
      </article>
    </Modal>
  );
};

export default Cookie;
