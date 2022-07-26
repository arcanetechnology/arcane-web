/** @format */

import { Button, Modal, Toggle } from '@arcane-web/alchemy-solid';
import { createSignal, Show, VoidComponent, createEffect } from 'solid-js';
import back from '../../assets/back.svg';
import { useAppContext } from '../contexts';

const Cookies: VoidComponent = () => {
  const [t] = useI18n();
  const [isOpen, toggleModal] = createSignal(false);
  const [isBreakDown, toggleBreakDown] = createSignal(false);

  const context = useAppContext();

  createEffect(
    on(isOpen, (isOpen) => {
      if (!isOpen && context.showCookie) {
        toggleModal(true);
      }
    })
  );

  const handleCookies = () => {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'granted',
    });
    context.showCookie = !context.showCookie;
    toggleModal(false);
  };

  return (
    <Modal size="small" toggleModal={toggleModal} isOpen={isOpen()}>
      <article class="align-center gap-big">
        <div class="align-row gap-small">
          <Show when={isBreakDown()}>
            <Button onClick={() => toggleBreakDown(false)}>
              <img src={back} width={20} />
            </Button>
          </Show>
          <p class="heading8">
            {t('global.cookie.title', {}, 'Cookie Settings')}
          </p>
        </div>
        <div class="align-vertical gap-big">
          <div class="align-vertical gap-default">
            <p class="body3">
              {t(
                'global.cookie.description',
                {},
                'We use cookies to improve your experience on our website.'
              )}{' '}
              <Link href="/cookies">
                {t('global.cookie.link', {}, 'learn more')}
              </Link>
            </p>
            <Show when={isBreakDown()}>
              {t('global.cookie.sections', {}, '').map(
                (section: { title: string; description: string }) => (
                  <div class="w-full">
                    <div class="align-row">
                      <p class="body1">{section.title}</p>
                      <div style={{ 'flex-grow': 1 }} />
                      <Toggle defaultChecked disabled />
                    </div>
                    <p class="small">{section.description}</p>
                  </div>
                )
              )}
            </Show>
          </div>
          <div
            class="w-full align-row"
            style={{ bottom: 0, position: 'relative' }}
          >
            <Show
              when={isBreakDown()}
              fallback={
                <Button
                  variant="secondary"
                  onClick={() => toggleBreakDown(true)}
                >
                  {t('global.cookie.manage', {}, 'Manage Cookies')}
                </Button>
              }
            >
              <Button variant="secondary" onClick={() => toggleModal(false)}>
                {t('global.cookie.cancel', {}, 'Cancel')}
              </Button>
            </Show>
            <div style={{ 'flex-grow': 1 }} />
            <Button variant="primary" onClick={() => handleCookies()}>
              {t('global.cookie.accept', {}, 'Accept')}
            </Button>
          </div>
        </div>
      </article>
    </Modal>
  );
};

export default Cookies;
