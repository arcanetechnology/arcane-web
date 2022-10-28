/** @format */

import * as React from 'react';
import { Highlight, NavigationHighlight } from '@/components';
import { custodies, GAP, transactions } from '@/constants';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';

const Index: React.FC = () => {
  return (
    <Stack gap={GAP}>
      <Box display="flex" flexDirection="row" gap={GAP}>
        <Highlight title="Total Users" value={20} />
        <Highlight title="Total Accounts" value={233} />
        <NavigationHighlight
          title="Total Fiat Custody Accounts"
          value={12}
          to={custodies}
        />
        <NavigationHighlight
          title="Total Transactions"
          value={10}
          to={transactions + '/create'}
        />
      </Box>
      <div
        className="tradingview-widget-container"
        dangerouslySetInnerHTML={{
          __html: `<div style="height:560px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F;padding:1px;padding: 0px; margin: 0px; width: 100%;"><div style="height:540px; padding:0px; margin:0px; width: 100%;"><iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505" width="100%" height="536px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0" style="border:0;margin:0;padding:0;line-height:14px;"></iframe></div><div style="color: #FFFFFF; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;"><a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #FFFFFF; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>`,
        }}
      />
    </Stack>
  );
};

export default Index;
