/** @format */

import { Authentication } from '@arcane-web/arcane-components';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@arcane-web/arcane-auth';
import { useNavigate } from 'solid-app-router';
import { onMount, VoidComponent } from 'solid-js';
import Invest from '../assets/invest.svg';

const Landing: VoidComponent = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const state = useAuth(auth);

  onMount(() => {
    if (state.data) {
      console.log(state.data);
      navigate('/invest/home', { replace: true });
    }
  });
  return (
    <>
      <section class="margin-48">
        <div class="container align-center">
          <h1>
            <b>
              Build generational wealth with our actively managed crypto fund.
            </b>
          </h1>
        </div>
      </section>
      <section class="margin-48">
        <div id="apology-message" class="container" data-auto-grid="2">
          <div class="space-8">
            <Invest />
          </div>
          <div class="space-8 align-vertical">
            <h1>The fund.</h1>
            <h4 class="secondary-text">
              Get managed exposure to cryptocurrencies as an asset class.
            </h4>
            <div class="margin-top-16">
              <Authentication />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
