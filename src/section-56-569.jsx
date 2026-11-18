const assetPathPrefix = "./assets/186afd32-24f2-427d-b3e5-a35863883d1a";
const imgIconShield = `${assetPathPrefix}/d575e.svg`;
const imgIconGrid = `${assetPathPrefix}/0e847.svg`;
const imgIconClock = `${assetPathPrefix}/6e49f.svg`;
const imgIconApps = `${assetPathPrefix}/6796a.svg`;
const imgIconGlobe = `${assetPathPrefix}/ff108.svg`;
const imgIconAgent = `${assetPathPrefix}/41b2d.svg`;
const imgIconKey = `${assetPathPrefix}/61413.svg`;
const imgIconBell = `${assetPathPrefix}/08caa.svg`;
const imgIconSliders = `${assetPathPrefix}/8099e.svg`;
const imgEllipse = `${assetPathPrefix}/02032.svg`;

export default function TopNavigation() {
  return (
    <div className="bg-[var(--color\/nav,#111827)] content-stretch flex gap-px items-center pl-[14px] pr-[12px] relative size-full" data-node-id="56:569" data-name="Top navigation">
      <div className="content-stretch flex gap-[5px] items-center overflow-clip pr-[10px] relative shrink-0" data-node-id="56:570" data-name="Group">
        <div className="relative shrink-0 size-[11px]" data-node-id="56:571" data-name="icon/shield">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconShield} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[9.5px] text-[color:var(--color\/white,white)] tracking-[-0.19px] whitespace-nowrap" data-node-id="56:573">
          intercept
        </p>
      </div>
      <div className="bg-[var(--color\/white,white)] content-stretch flex gap-[3.5px] items-center overflow-clip px-[6.5px] py-[4px] relative rounded-[499.5px] shrink-0" data-node-id="56:574" data-name="nav/Overview">
        <div className="relative shrink-0 size-[7.5px]" data-node-id="56:575" data-name="icon/grid">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGrid} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[6.5px] text-[color:var(--color\/nav,#111827)] whitespace-nowrap" data-node-id="56:580">
          Overview
        </p>
      </div>
      <div className="content-stretch flex gap-[3.5px] items-center overflow-clip px-[6.5px] py-[4px] relative rounded-[499.5px] shrink-0" data-node-id="56:581" data-name="nav/Timeline">
        <div className="relative shrink-0 size-[7.5px]" data-node-id="56:582" data-name="icon/clock">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconClock} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[6.5px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="56:585">
          Timeline
        </p>
      </div>
      <div className="content-stretch flex gap-[3.5px] items-center overflow-clip px-[6.5px] py-[4px] relative rounded-[499.5px] shrink-0" data-node-id="56:586" data-name="nav/Apps">
        <div className="relative shrink-0 size-[7.5px]" data-node-id="56:587" data-name="icon/apps">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconApps} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[6.5px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="56:592">
          Apps
        </p>
      </div>
      <div className="content-stretch flex gap-[3.5px] items-center overflow-clip px-[6.5px] py-[4px] relative rounded-[499.5px] shrink-0" data-node-id="56:593" data-name="nav/Network">
        <div className="relative shrink-0 size-[7.5px]" data-node-id="56:594" data-name="icon/globe">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGlobe} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[6.5px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="56:598">
          Network
        </p>
      </div>
      <div className="content-stretch flex gap-[3.5px] items-center overflow-clip px-[6.5px] py-[4px] relative rounded-[499.5px] shrink-0" data-node-id="56:599" data-name="nav/Agents">
        <div className="relative shrink-0 size-[7.5px]" data-node-id="56:600" data-name="icon/agent">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconAgent} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[6.5px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="56:605">
          Agents
        </p>
      </div>
      <div className="content-stretch flex gap-[3.5px] items-center overflow-clip px-[6.5px] py-[4px] relative rounded-[499.5px] shrink-0" data-node-id="56:606" data-name="nav/Identity">
        <div className="relative shrink-0 size-[7.5px]" data-node-id="56:607" data-name="icon/key">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconKey} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[6.5px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="56:610">
          Identity
        </p>
      </div>
      <div className="content-stretch flex gap-[3.5px] items-center overflow-clip px-[6.5px] py-[4px] relative rounded-[499.5px] shrink-0" data-node-id="56:611" data-name="nav/Alerts & rules">
        <div className="relative shrink-0 size-[7.5px]" data-node-id="56:612" data-name="icon/bell">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBell} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[6.5px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="56:615">{`Alerts & rules`}</p>
        <div className="bg-[var(--color\/accent,#2563eb)] content-stretch flex items-start overflow-clip px-[3px] py-[0.5px] relative rounded-[499.5px] shrink-0" data-node-id="56:616" data-name="Group">
          <p className="[word-break:break-word] font-['Roboto_Mono:Medium'] font-medium leading-[normal] relative shrink-0 text-[5px] text-[color:var(--color\/white,white)] whitespace-nowrap" data-node-id="56:617">
            200
          </p>
        </div>
      </div>
      <div className="content-stretch flex gap-[3.5px] items-center overflow-clip px-[6.5px] py-[4px] relative rounded-[499.5px] shrink-0" data-node-id="56:618" data-name="nav/Settings">
        <div className="relative shrink-0 size-[7.5px]" data-node-id="56:619" data-name="icon/sliders">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconSliders} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[6.5px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="56:621">
          Settings
        </p>
      </div>
      <div className="flex-[1_0_0] h-[0.5px] min-w-px relative" data-node-id="56:622" data-name="spacer" />
      <div className="bg-[var(--color\/nav-active,#1f2937)] content-stretch flex gap-px items-start overflow-clip p-[1.5px] relative rounded-[499.5px] shrink-0" data-node-id="56:623" data-name="Mode switch">
        <div className="content-stretch flex items-start overflow-clip px-[6.5px] py-[3px] relative rounded-[499.5px] shrink-0" data-node-id="56:624" data-name="Group">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[6.25px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="56:625">
            Simple
          </p>
        </div>
        <div className="bg-[var(--color\/accent,#2563eb)] content-stretch flex items-start overflow-clip px-[6.5px] py-[3px] relative rounded-[499.5px] shrink-0" data-node-id="56:626" data-name="Group">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[6.25px] text-[color:var(--color\/white,white)] whitespace-nowrap" data-node-id="56:627">
            Advanced
          </p>
        </div>
      </div>
      <div className="content-stretch flex gap-[3px] items-center overflow-clip pl-[7px] relative shrink-0" data-node-id="56:628" data-name="Group">
        <div className="relative shrink-0 size-[3px]" data-node-id="56:629" data-name="Ellipse">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
        </div>
        <p className="[word-break:break-word] font-['Roboto_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[5.25px] text-[color:var(--color\/nav-text,#b8c0cc)] tracking-[0.21px] whitespace-nowrap" data-node-id="56:630">
          LOCAL BETA 0.3
        </p>
      </div>
    </div>
  );
}
