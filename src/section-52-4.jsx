const assetPathPrefix = "./assets/e8c75410-f486-4abd-b50e-f338259b4b5d";
const imgEllipse = `${assetPathPrefix}/cfc03.svg`;

export default function UtilityBar() {
  return (
    <div className="bg-[#0a2540] content-stretch flex gap-[12px] items-center px-[120px] py-[10px] relative size-full" data-node-id="52:4" data-name="Utility bar">
      <div className="relative shrink-0 size-[6px]" data-node-id="52:5" data-name="Ellipse">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
      </div>
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular'] font-normal leading-[normal] relative shrink-0 text-[#f2f5f9] text-[13px] whitespace-nowrap" data-node-id="52:6" style={{ fontVariationSettings: '"wdth" 100' }}>
        Intercept 0.3 beta for Windows 11 is available. Local-only by design: no account, no telemetry, no update checker.
      </p>
      <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="52:7" data-name="spacer" />
      <p className="[word-break:break-word] font-['Instrument_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[#93c5fd] text-[13px] whitespace-nowrap" data-node-id="52:8" style={{ fontVariationSettings: '"wdth" 100' }}>
        Read the release notes →
      </p>
    </div>
  );
}
