const assetPathPrefix = "./assets/6d291cf4-c26c-426f-9411-cbbe1fd99a33";
const imgIconShield = `${assetPathPrefix}/eb2cc.svg`;
const imgIconGithub = `${assetPathPrefix}/0d38b.svg`;

export default function GlobalNavigation() {
  return (
    <div className="bg-white border-[#e4e7ec] border-b border-solid content-stretch flex gap-[36px] items-center px-[120px] relative size-full" data-node-id="52:9" data-name="Global navigation">
      <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="52:10" data-name="Group">
        <div className="relative shrink-0 size-[24px]" data-node-id="52:11" data-name="icon/shield">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconShield} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#0b1220] text-[21px] tracking-[-0.42px] whitespace-nowrap" data-node-id="52:13">
          intercept
        </p>
      </div>
      <div className="[word-break:break-word] content-stretch flex font-['Instrument_Sans:Medium'] font-medium gap-[28px] items-center leading-[normal] overflow-clip relative shrink-0 text-[#3d4757] text-[15px] whitespace-nowrap" data-node-id="52:14" data-name="Group">
        <p className="relative shrink-0" data-node-id="52:15" style={{ fontVariationSettings: '"wdth" 100' }}>
          Product
        </p>
        <p className="relative shrink-0" data-node-id="52:16" style={{ fontVariationSettings: '"wdth" 100' }}>
          AI agents
        </p>
        <p className="relative shrink-0" data-node-id="52:17" style={{ fontVariationSettings: '"wdth" 100' }}>
          Security
        </p>
        <p className="relative shrink-0" data-node-id="52:18" style={{ fontVariationSettings: '"wdth" 100' }}>
          Documentation
        </p>
        <p className="relative shrink-0" data-node-id="52:19" style={{ fontVariationSettings: '"wdth" 100' }}>
          Pricing
        </p>
      </div>
      <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="52:20" data-name="spacer" />
      <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-node-id="52:21" data-name="Group">
        <div className="relative shrink-0 size-[18px]" data-node-id="52:22" data-name="icon/github">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGithub} />
        </div>
        <p className="[word-break:break-word] font-['Instrument_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[#3d4757] text-[15px] whitespace-nowrap" data-node-id="52:25" style={{ fontVariationSettings: '"wdth" 100' }}>
          GitHub
        </p>
      </div>
      <div className="bg-[#2563eb] content-stretch flex items-center overflow-clip px-[22px] py-[13px] relative rounded-[6px] shrink-0" data-node-id="52:26" data-name="Button/primary">
        <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="52:27" style={{ fontVariationSettings: '"wdth" 100' }}>
          Download for Windows
        </p>
      </div>
    </div>
  );
}
