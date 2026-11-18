const assetPathPrefix = "./assets/f1b3a755-9389-4ad9-b875-cb660b5b1336";
const imgEllipse = `${assetPathPrefix}/8f070.svg`;
const imgDot = `${assetPathPrefix}/5e46a.svg`;
const imgDot1 = `${assetPathPrefix}/fb8e6.svg`;

export default function Group() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative size-full" data-node-id="56:632" data-name="Group">
      <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="56:633" data-name="Group">
        <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[16px] relative shrink-0 text-[13px] text-[color:var(--color\/text,#111827)] tracking-[-0.195px]" data-node-id="56:634">
          Activity overview
        </p>
        <p className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[6.5px] text-[color:var(--color\/text-2,#5d6778)]" data-node-id="56:635">
          A live record of access, connections and changes on this device.
        </p>
      </div>
      <div className="content-stretch flex gap-[3px] items-center overflow-clip relative shrink-0" data-node-id="56:636" data-name="Group">
        <div className="relative shrink-0 size-[3px]" data-node-id="56:637" data-name="Ellipse">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
        </div>
        <p className="[word-break:break-word] font-['Roboto_Mono:Medium'] font-medium leading-[normal] relative shrink-0 text-[5.5px] text-[color:var(--color\/accent,#2563eb)] tracking-[0.22px] whitespace-nowrap" data-node-id="56:638">
          LISTENING CONTINUOUSLY
        </p>
      </div>
      <div className="bg-[var(--color\/success-soft,#eaf7f2)] content-stretch flex gap-[3px] items-center px-[4px] py-[1.5px] relative rounded-[499.5px] shrink-0" data-node-id="56:639" data-name="Pill/Success">
        <div className="relative shrink-0 size-[3px]" data-node-id="I56:639;16:56" data-name="dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot} />
        </div>
        <p className="[word-break:break-word] font-['Roboto_Mono:Medium'] font-medium leading-[normal] relative shrink-0 text-[5.25px] text-[color:var(--color\/success,#067647)] tracking-[0.21px] uppercase whitespace-nowrap" data-node-id="I56:639;16:57">
          Input guard · partial 1/8
        </p>
      </div>
      <div className="bg-[var(--color\/purple-soft,#f2eef8)] content-stretch flex gap-[3px] items-center px-[4px] py-[1.5px] relative rounded-[499.5px] shrink-0" data-node-id="56:640" data-name="Pill/Purple">
        <div className="relative shrink-0 size-[3px]" data-node-id="I56:640;16:71" data-name="dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
        </div>
        <p className="[word-break:break-word] font-['Roboto_Mono:Medium'] font-medium leading-[normal] relative shrink-0 text-[5.25px] text-[color:var(--color\/purple,#6b5a91)] tracking-[0.21px] uppercase whitespace-nowrap" data-node-id="I56:640;16:72">
          Agents · 2 trusted
        </p>
      </div>
      <div className="bg-[var(--color\/btn-flat,#e9edf3)] content-stretch flex items-center justify-center px-[10px] py-[5.5px] relative rounded-[499.5px] shrink-0" data-node-id="56:641" data-name="v4 Button/Secondary">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[7px] text-[color:var(--color\/text,#111827)] whitespace-nowrap" data-node-id="I56:641;32:66">
          Pause collection
        </p>
      </div>
    </div>
  );
}
