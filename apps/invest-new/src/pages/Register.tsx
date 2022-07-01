/** @format */

import { createResource, onMount, VoidComponent } from 'solid-js';
import Invest from '../assets/invest.svg';
import { investClient } from '../contentful.config';

const getQuestions = async () =>
  await investClient
    .getEntries()
    .then((entries) => entries.items)
    .then((items) => items.map((item) => item.fields))
    .then((items) => items);

const Landing: VoidComponent = () => {
  onMount(() => {
    getQ
  })
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
            <div class="margin-top-16"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
