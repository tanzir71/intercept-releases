const assetPathPrefix = "./assets/659af4f1-e2b4-41c8-8b23-f879d54b31b9";
const imgEllipse = `${assetPathPrefix}/f01ab.svg`;
const imgDot = `${assetPathPrefix}/19059.svg`;
const imgDot1 = `${assetPathPrefix}/a8cda.svg`;

export default function Group() {
  return (
    <div className="content-stretch flex gap-[9.2px] items-center relative size-full" data-node-id="55:110" data-name="Group">
      <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3.067px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="55:111" data-name="Group">
        <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[24.534px] relative shrink-0 text-[19.934px] text-[color:var(--color\/text,#111827)] tracking-[-0.299px]" data-node-id="55:112">
          Activity overview
        </p>
        <p className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[9.967px] text-[color:var(--color\/text-2,#5d6778)]" data-node-id="55:113">
          A live record of access, connections and changes on this device.
        </p>
      </div>
      <div className="content-stretch flex gap-[4.6px] items-center overflow-clip relative shrink-0" data-node-id="55:114" data-name="Group">
        <div className="relative shrink-0 size-[4.6px]" data-node-id="55:115" data-name="Ellipse">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
        </div>
        <p className="[word-break:break-word] font-['Roboto_Mono:Medium'] font-medium leading-[normal] relative shrink-0 text-[8.434px] text-[color:var(--color\/accent,#2563eb)] tracking-[0.3373px] whitespace-nowrap" data-node-id="55:116">
          LISTENING CONTINUOUSLY
        </p>
      </div>
      <div className="bg-[var(--color\/success-soft,#eaf7f2)] content-stretch flex gap-[4.6px] items-center px-[6.134px] py-[2.3px] relative rounded-[765.933px] shrink-0" data-node-id="55:117" data-name="Pill/Success">
        <div className="relative shrink-0 size-[4.6px]" data-node-id="I55:117;16:56" data-name="dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot} />
        </div>
        <p className="[word-break:break-word] font-['Roboto_Mono:Medium'] font-medium leading-[normal] relative shrink-0 text-[8.05px] text-[color:var(--color\/success,#067647)] tracking-[0.322px] uppercase whitespace-nowrap" data-node-id="I55:117;16:57">
          Input guard · partial 1/8
        </p>
      </div>
      <div className="bg-[var(--color\/purple-soft,#f2eef8)] content-stretch flex gap-[4.6px] items-center px-[6.134px] py-[2.3px] relative rounded-[765.933px] shrink-0" data-node-id="55:118" data-name="Pill/Purple">
        <div className="relative shrink-0 size-[4.6px]" data-node-id="I55:118;16:71" data-name="dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
        </div>
        <p className="[word-break:break-word] font-['Roboto_Mono:Medium'] font-medium leading-[normal] relative shrink-0 text-[8.05px] text-[color:var(--color\/purple,#6b5a91)] tracking-[0.322px] uppercase whitespace-nowrap" data-node-id="I55:118;16:72">
          Agents · 2 trusted
        </p>
      </div>
      <div className="bg-[var(--color\/btn-flat,#e9edf3)] content-stretch flex items-center justify-center px-[15.334px] py-[8.434px] relative rounded-[765.933px] shrink-0" data-node-id="55:119" data-name="v4 Button/Secondary">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10.734px] text-[color:var(--color\/text,#111827)] whitespace-nowrap" data-node-id="I55:119;32:66">
          Pause collection
        </p>
      </div>
    </div>
  );
}
