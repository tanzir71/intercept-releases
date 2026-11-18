const assetPathPrefix = "./assets/e12127cf-6467-474e-9fd9-dd69d0de5e85";
const imgIconDownload = `${assetPathPrefix}/4f4d7.svg`;

export default function ClosingCta() {
  return (
    <div className="bg-[#2563eb] content-stretch flex flex-col items-center py-[96px] relative size-full" data-node-id="57:467" data-name="Closing CTA">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[1200px]" data-node-id="57:468" data-name="Inner">
        <div className="content-stretch flex gap-[40px] items-center overflow-clip relative shrink-0 w-full" data-node-id="57:469" data-name="Group">
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative" data-node-id="57:470" data-name="Group">
            <p className="font-['Instrument_Sans:SemiBold'] font-semibold leading-[50px] min-w-full relative shrink-0 text-[44px] text-white tracking-[-0.88px] w-[min-content]" data-node-id="57:471" style={{ fontVariationSettings: '"wdth" 100' }}>
              See what your PC is really doing.
            </p>
            <p className="font-['Instrument_Sans:Regular'] font-normal leading-[normal] relative shrink-0 text-[#dce7fd] text-[18px] whitespace-nowrap" data-node-id="57:472" style={{ fontVariationSettings: '"wdth" 100' }}>
              Free, open source and local. Ready in a few minutes.
            </p>
          </div>
          <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0" data-node-id="57:473" data-name="Group">
            <div className="bg-white content-stretch flex gap-[8px] items-center overflow-clip px-[22px] py-[13px] relative rounded-[6px] shrink-0" data-node-id="57:474" data-name="Group">
              <div className="relative shrink-0 size-[18px]" data-node-id="57:475" data-name="icon/download">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconDownload} />
              </div>
              <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#0b1220] text-[15px] whitespace-nowrap" data-node-id="57:479" style={{ fontVariationSettings: '"wdth" 100' }}>
                Download for Windows
              </p>
            </div>
            <div className="bg-[#1d4ed8] content-stretch flex items-center overflow-clip px-[22px] py-[13px] relative rounded-[6px] shrink-0" data-node-id="57:480" data-name="Group">
              <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="57:481" style={{ fontVariationSettings: '"wdth" 100' }}>
                Read the security brief
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
