/** @format */

import { VoidComponent, Show, For } from 'solid-js';
import {
  Info,
  AssetInfo,
  isSmall,
  AssetInfoSvg,
  Contact,
  Mission,
} from '../components';
import ArcaneAppProvider from '../components/app/ArcaneApp';
import { gql } from '@solid-primitives/graphql';
import investClient from '../invest-contentful';
import { FundInfoCollection } from '../invest.types';

const Home: VoidComponent = () => {
  const [fundInfoCollection] = investClient<{
    fundInfoCollection: FundInfoCollection;
  }>(
    gql`
      query {
        fundInfoCollection(limit: 1) {
          items {
            hero {
              name
              image {
                url
              }
              description {
                json
              }
            }
            title
            infoCardsCollection(limit: 4) {
              items {
                title
                caption
              }
            }
            portfolioCollection {
              items {
                name
                units
              }
            }
            chart {
              title
              url
            }
            contact {
              name
              image {
                url
              }
              description {
                json
              }
            }
          }
        }
      }
    `
  );

  const getSecondaryClass = (index: number) => {
    const columnCount = isSmall() ? 1 : 2;
    const rowIndex = Math.floor(index / columnCount);
    const columnIndex = index % columnCount;
    return (rowIndex + columnIndex) % 2 == 0;
  };

  return (
    <ArcaneAppProvider name={import.meta.env.VITE_APP_NAME}>
      <Show
        when={fundInfoCollection()}
        fallback={
          <>
            <h6>Loading...</h6>
          </>
        }
      >
        <section class="margin-24">
          <Mission
            url={
              fundInfoCollection().fundInfoCollection.items[0].hero.image.url
            }
            description={
              fundInfoCollection().fundInfoCollection.items[0].hero.description
                .json
            }
          />
        </section>
        <section class={isSmall() ? 'margin-16' : 'margin-48'}>
          <div class="container">
            <h5>{fundInfoCollection().fundInfoCollection.items[0].title}</h5>
          </div>
        </section>
        <section class="container">
          <div id="invest-stats" class="gap-small parent" data-auto-grid="2">
            <div
              id="invest-home-info-cards"
              class="gap-small child"
              data-auto-grid="2"
            >
              <For
                each={
                  fundInfoCollection().fundInfoCollection.items[0]
                    .infoCardsCollection.items
                }
              >
                {(item, index) => (
                  <Info
                    title={item.title}
                    description={item.caption}
                    variant={
                      getSecondaryClass(index()) ? 'secondary' : 'primary'
                    }
                  />
                )}
              </For>
            </div>
            <div id="invest-chart" class="child">
              <AssetInfoSvg
                data={
                  fundInfoCollection().fundInfoCollection.items[0]
                    .portfolioCollection.items
                }
                title={'Fund Holdings'}
              />
            </div>
          </div>
          <div id="fund-value" class="padding-48">
            <img
              width={'100%'}
              alt={fundInfoCollection().fundInfoCollection.items[0].chart.title}
              src={fundInfoCollection().fundInfoCollection.items[0].chart.url}
            />
          </div>
          <div id="contact" class="margin-48">
            <Contact
              url={
                fundInfoCollection().fundInfoCollection.items[0].contact.image
                  .url
              }
              title={
                fundInfoCollection().fundInfoCollection.items[0].contact.name
              }
              description={
                fundInfoCollection().fundInfoCollection.items[0].contact
                  .description.json
              }
            />
          </div>
        </section>
      </Show>
    </ArcaneAppProvider>
  );
};

export default Home;
