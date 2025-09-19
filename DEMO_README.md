# ZeroWallet Demo - Frontend Only

This is a simplified, frontend-only version of the ZeroWallet application designed for demonstration purposes.

## What's Included

✅ **Complete UI/UX** - All pages and components are functional
✅ **Mock Data** - Realistic demo data for tokens, NFTs, and DeFi positions
✅ **Wallet Connection** - Simplified wallet connection (no complex blockchain interactions)
✅ **Responsive Design** - Works on desktop and mobile
✅ **All Pages** - Home, App dashboard, Send, Swap, Investments, Settings

## What's Removed

❌ **API Routes** - All backend API endpoints removed
❌ **Complex Blockchain Logic** - No real blockchain interactions
❌ **External API Calls** - No Zapper API or other external services
❌ **Passkey Authentication** - Simplified authentication
❌ **Smart Contract Interactions** - No contract deployments or calls

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Set Environment Variables**
   Create a `.env.local` file:
   ```bash
   NEXT_PUBLIC_PROJECT_ID=demo-project-id
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

## Features

### Dashboard
- Mock wallet balance display
- Token portfolio with realistic data
- DeFi positions overview
- NFT collection display
- Transaction history (empty for demo)

### Navigation
- All navigation links work
- Responsive sidebar and topbar
- Clean, modern UI design

### Mock Data
- **Tokens**: ETH, USDC, USDT with realistic balances
- **NFTs**: Sample NFT collection with floor prices
- **DeFi**: Uniswap V3 and Aave V3 positions
- **Networks**: Support for multiple blockchain networks

## File Structure

```
app/
├── app/                    # Main application pages
│   ├── page.tsx           # Home page
│   ├── app/page.tsx       # Dashboard (simplified)
│   ├── send/page.tsx      # Send page
│   ├── swap/page.tsx      # Swap page
│   ├── investments/page.tsx # Investments page
│   └── settings/page.tsx  # Settings page
├── components/            # Reusable UI components
├── context/              # Simplified React contexts
│   ├── LoginProvider.tsx # Mock authentication
│   └── ZapperProvider.tsx # Mock data provider
├── data/
│   └── mockData.ts       # Demo data
└── utils/                # Utility functions
```

## Next Steps for Full Implementation

When ready to add backend functionality:

1. **Add API Routes** - Restore the deleted API routes
2. **Implement Real Blockchain Logic** - Add back the complex blockchain interactions
3. **Connect External APIs** - Integrate with Zapper, Etherscan, etc.
4. **Add Authentication** - Implement passkey and wallet authentication
5. **Smart Contracts** - Add contract deployment and interaction logic

## Demo Notes

- All data is static and for demonstration purposes only
- Wallet connection is simplified (no real blockchain connection required)
- No real transactions can be performed
- Perfect for showcasing the UI/UX design and user flow

Enjoy exploring the ZeroWallet demo! 🚀
