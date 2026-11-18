const assetPathPrefix = "./assets/ae7a4238-6f1f-4b65-8d02-f131e65ccf6e";
const imgIconShield = `${assetPathPrefix}/d07c7.svg`;
const imgIconMinus = `${assetPathPrefix}/a0823.svg`;
const imgIconSquare = `${assetPathPrefix}/f8c19.svg`;
const imgIconX = `${assetPathPrefix}/bacae.svg`;

export default function WindowsTitleBar() {
  return (
    <div className="bg-[#1f1f1f] content-stretch flex gap-[6.134px] items-center pl-[9.2px] relative size-full" data-node-id="55:33" data-name="Windows title bar">
      <div className="relative shrink-0 size-[10.734px]" data-node-id="55:34" data-name="icon/shield">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconShield} />
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#e6e6e6] text-[9.2px] whitespace-nowrap" data-node-id="55:36">
        Intercept · Your privacy, in view
      </p>
      <div className="flex-[1_0_0] h-[0.767px] min-w-px relative" data-node-id="55:37" data-name="spacer" />
      <div className="content-stretch flex h-[24.534px] items-center justify-center overflow-clip relative shrink-0 w-[35.268px]" data-node-id="55:38" data-name="Group">
        <div className="relative shrink-0 size-[10.734px]" data-node-id="55:39" data-name="icon/minus">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconMinus} />
        </div>
      </div>
      <div className="content-stretch flex h-[24.534px] items-center justify-center overflow-clip relative shrink-0 w-[35.268px]" data-node-id="55:41" data-name="Group">
        <div className="relative shrink-0 size-[10.734px]" data-node-id="55:42" data-name="icon/square">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconSquare} />
        </div>
      </div>
      <div className="content-stretch flex h-[24.534px] items-center justify-center overflow-clip relative shrink-0 w-[35.268px]" data-node-id="55:44" data-name="Group">
        <div className="relative shrink-0 size-[10.734px]" data-node-id="55:45" data-name="icon/x">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconX} />
        </div>
      </div>
    </div>
  );
}
