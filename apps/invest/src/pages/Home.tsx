/** @format */

import { useNavigate } from 'solid-app-router';
import type { VoidComponent } from 'solid-js';
import { Private, Info, Donut, FundValue } from '../components';

const Home: VoidComponent = () => {
  const navigate = useNavigate();
  // TODO: do a get user Call
  navigate('/invest/register', { replace: true });
  return (
    <Private>
      <section class="margin-48">
        <div class="container">
          <h1>Investor Dashboard</h1>
        </div>
      </section>
      <section class="container">
        <div id="invest-stats" class="gap-small parent">
          <div
            id="invest-home-info-cards"
            class="gap-small child"
            data-auto-grid="2"
          >
            <Info
              title="$16m"
              variant="secondary"
              description="Assets Under Management"
            />
            <Info title="55%" description="Bitcoin Holdings" />
            <Info title="25%" description="Fund Performance YTD" />
            <Info
              title="8%"
              variant="secondary"
              description="Fund Performance x Benchmark YTD"
            />
          </div>
          <div id="invest-chart" class="child">
            <Donut
              value={'35%'}
              title={'Usage overview'}
              data={{
                Bitcoin: { value: 35, color: '#090A0B' },
                Etherium: { value: 15, color: '#5AC8FA' },
                Dodegcoin: { value: 20, color: '#5856D6' },
                Solano: { value: 30, color: '#AEAEB2' },
              }}
            />
          </div>
        </div>
        <div id="fund-value" class="padding-48">
          <FundValue
            title="Fund Value Overtime"
            labels={[
              '00:00',
              '01:00',
              '02:00',
              '03:00',
              '04:00',
              '05:00',
              '06:00',
              '07:00',
              '08:00',
              '09:00',
            ]}
            max={70}
            datasets={[
              {
                label: 'Buying',
                data: [10, 28, 29, 39, 50, 47, 30, 20, 36, 45],
              },
              {
                label: 'Selling',
                data: [38, 31, 40, 28, 39, 10, 50, 30, 35, 21],
              },
            ]}
          />
        </div>
      </section>
    </Private>
  );
};

export default Home;
