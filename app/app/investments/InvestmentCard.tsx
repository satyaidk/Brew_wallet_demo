import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type InvestmentCardProps = {
  job: {
    id: string;
    token: string;
    amount: string;
    frequency: string;
    vault: string;
    status: string;
    nextExecution: string;
    totalInvested: string;
  };
};

export function InvestmentCard({ job }: InvestmentCardProps) {
  const getTokenIcon = (symbol: string): string => {
    const iconMap: { [key: string]: string } = {
      'ETH': '/tokens/ethereum.webp',
      'USDC': '/tokens/usdc.svg',
      'USDT': '/tokens/usdt.png',
      'BTC': '/tokens/wbtc.svg',
      'MATIC': '/tokens/wmatic.png',
    };
    
    return iconMap[symbol] || '/tokens/default.png';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString();
  };

  return (
    <div className="border border-accent w-full flex flex-col gap-0 relative h-fit rounded-lg">
      <div className="flex flex-row md:justify-between items-center px-4 py-3 border-b border-accent md:items-center gap-2">
        <div className="flex flex-row items-center gap-3 w-full">
          <div className="flex flex-row justify-start items-center gap-2">
            <Image
              src={getTokenIcon(job.token)}
              alt="Token"
              width={30}
              height={30}
            />
            <div className="font-semibold">{job.token}</div>
          </div>

          <div>
            <ChevronsRight />
          </div>

          <div className="flex flex-row justify-start items-center gap-2">
            <Image
              src="/tokens/default.png"
              alt="Vault"
              width={30}
              height={30}
            />
            <div className="font-semibold">{job.vault}</div>
          </div>
        </div>

        <Switch
          className="bg-accent rounded-full data-[state=checked]:bg-secondary data-[state=unchecked]:bg-accent border border-accent"
          onCheckedChange={(checked) => {
            console.log(`Demo: ${checked ? 'Enabled' : 'Disabled'} investment strategy ${job.id}`);
          }}
          defaultChecked={job.status === 'active'}
        />
      </div>

      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-col justify-between items-start gap-0 w-full divide-y divide-accent">
          <div className="flex flex-col gap-2 px-4 py-3 w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="font-semibold">Frequency</h4>
              <h5 className="capitalize">{job.frequency}</h5>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="font-semibold">Amount</h4>
              <div className="flex flex-row justify-start items-center gap-2">
                <Image
                  src={getTokenIcon(job.token)}
                  alt="Token"
                  width={20}
                  height={20}
                />
                <div>{job.amount}</div>
                <div>{job.token}</div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="font-semibold">Next Execution</h4>
              <h5>{formatDate(job.nextExecution)} {formatTime(job.nextExecution)}</h5>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 py-3 w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="font-semibold">Total Invested</h4>
              <div className="flex flex-row justify-start items-center gap-2">
                <Image
                  src={getTokenIcon(job.token)}
                  alt="Token"
                  width={20}
                  height={20}
                />
                <div className="font-semibold" style={{ color: '#ff5f52' }}>
                  -{job.totalInvested}
                </div>
                <div className="font-semibold">{job.token}</div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="font-semibold">Status</h4>
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                job.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {job.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
