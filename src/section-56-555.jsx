const assetPathPrefix = "./assets/cd9dc05a-eafb-46b1-9d98-1084d9a28b6b";
const imgIconShield = `${assetPathPrefix}/5c8a4.svg`;
const imgIconMinus = `${assetPathPrefix}/b601b.svg`;
const imgIconSquare = `${assetPathPrefix}/0930f.svg`;
const imgIconX = `${assetPathPrefix}/26fed.svg`;

export default function WindowsTitleBar() {
  return (
    <div className="bg-[#1f1f1f] content-stretch flex gap-[4px] items-center pl-[6px] relative size-full" data-node-id="56:555" data-name="Windows title bar">
      <div className="relative shrink-0 size-[7px]" data-node-id="56:556" data-name="icon/shield">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconShield} />
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#e6e6e6] text-[6px] whitespace-nowrap" data-node-id="56:558">
        Intercept · Your privacy, in view
      </p>
      <div className="flex-[1_0_0] h-[0.5px] min-w-px relative" data-node-id="56:559" data-name="spacer" />
      <div className="content-stretch flex h-[16px] items-center justify-center overflow-clip relative shrink-0 w-[23px]" data-node-id="56:560" data-name="Group">
        <div className="relative shrink-0 size-[7px]" data-node-id="56:561" data-name="icon/minus">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconMinus} />
        </div>
      </div>
      <div className="content-stretch flex h-[16px] items-center justify-center overflow-clip relative shrink-0 w-[23px]" data-node-id="56:563" data-name="Group">
        <div className="relative shrink-0 size-[7px]" data-node-id="56:564" data-name="icon/square">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconSquare} />
        </div>
      </div>
      <div className="content-stretch flex h-[16px] items-center justify-center overflow-clip relative shrink-0 w-[23px]" data-node-id="56:566" data-name="Group">
        <div className="relative shrink-0 size-[7px]" data-node-id="56:567" data-name="icon/x">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconX} />
        </div>
      </div>
    </div>
  );
}
