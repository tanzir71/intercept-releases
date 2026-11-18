const assetPathPrefix = "./assets/37e340cb-534a-4205-908f-97155b07fc07";
const imgIconShield = `${assetPathPrefix}/1be69.svg`;
const imgIconGrid = `${assetPathPrefix}/c479d.svg`;
const imgIconClock = `${assetPathPrefix}/64916.svg`;
const imgIconApps = `${assetPathPrefix}/3255b.svg`;
const imgIconGlobe = `${assetPathPrefix}/c28df.svg`;
const imgIconAgent = `${assetPathPrefix}/7e1e2.svg`;
const imgIconKey = `${assetPathPrefix}/0e044.svg`;
const imgIconBell = `${assetPathPrefix}/ed215.svg`;
const imgIconSliders = `${assetPathPrefix}/335d7.svg`;
const imgEllipse = `${assetPathPrefix}/53cd2.svg`;

export default function TopNavigation() {
  return (
    <div className="bg-[var(--color\/nav,#111827)] content-stretch flex gap-[1.533px] items-center pl-[21.468px] pr-[18.401px] relative size-full" data-node-id="55:47" data-name="Top navigation">
      <div className="content-stretch flex gap-[7.667px] items-center overflow-clip pr-[15.334px] relative shrink-0" data-node-id="55:48" data-name="Group">
        <div className="relative shrink-0 size-[16.867px]" data-node-id="55:49" data-name="icon/shield">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconShield} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[14.567px] text-[color:var(--color\/white,white)] tracking-[-0.2913px] whitespace-nowrap" data-node-id="55:51">
          intercept
        </p>
      </div>
      <div className="bg-[var(--color\/white,white)] content-stretch flex gap-[5.367px] items-center overflow-clip px-[9.967px] py-[6.134px] relative rounded-[765.933px] shrink-0" data-node-id="55:52" data-name="nav/Overview">
        <div className="relative shrink-0 size-[11.5px]" data-node-id="55:53" data-name="icon/grid">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGrid} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[9.967px] text-[color:var(--color\/nav,#111827)] whitespace-nowrap" data-node-id="55:58">
          Overview
        </p>
      </div>
      <div className="content-stretch flex gap-[5.367px] items-center overflow-clip px-[9.967px] py-[6.134px] relative rounded-[765.933px] shrink-0" data-node-id="55:59" data-name="nav/Timeline">
        <div className="relative shrink-0 size-[11.5px]" data-node-id="55:60" data-name="icon/clock">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconClock} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[9.967px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="55:63">
          Timeline
        </p>
      </div>
      <div className="content-stretch flex gap-[5.367px] items-center overflow-clip px-[9.967px] py-[6.134px] relative rounded-[765.933px] shrink-0" data-node-id="55:64" data-name="nav/Apps">
        <div className="relative shrink-0 size-[11.5px]" data-node-id="55:65" data-name="icon/apps">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconApps} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[9.967px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="55:70">
          Apps
        </p>
      </div>
      <div className="content-stretch flex gap-[5.367px] items-center overflow-clip px-[9.967px] py-[6.134px] relative rounded-[765.933px] shrink-0" data-node-id="55:71" data-name="nav/Network">
        <div className="relative shrink-0 size-[11.5px]" data-node-id="55:72" data-name="icon/globe">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGlobe} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[9.967px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="55:76">
          Network
        </p>
      </div>
      <div className="content-stretch flex gap-[5.367px] items-center overflow-clip px-[9.967px] py-[6.134px] relative rounded-[765.933px] shrink-0" data-node-id="55:77" data-name="nav/Agents">
        <div className="relative shrink-0 size-[11.5px]" data-node-id="55:78" data-name="icon/agent">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconAgent} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[9.967px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="55:83">
          Agents
        </p>
      </div>
      <div className="content-stretch flex gap-[5.367px] items-center overflow-clip px-[9.967px] py-[6.134px] relative rounded-[765.933px] shrink-0" data-node-id="55:84" data-name="nav/Identity">
        <div className="relative shrink-0 size-[11.5px]" data-node-id="55:85" data-name="icon/key">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconKey} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[9.967px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="55:88">
          Identity
        </p>
      </div>
      <div className="content-stretch flex gap-[5.367px] items-center overflow-clip px-[9.967px] py-[6.134px] relative rounded-[765.933px] shrink-0" data-node-id="55:89" data-name="nav/Alerts & rules">
        <div className="relative shrink-0 size-[11.5px]" data-node-id="55:90" data-name="icon/bell">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBell} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[9.967px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="55:93">{`Alerts & rules`}</p>
        <div className="bg-[var(--color\/accent,#2563eb)] content-stretch flex items-start overflow-clip px-[4.6px] py-[0.767px] relative rounded-[765.933px] shrink-0" data-node-id="55:94" data-name="Group">
          <p className="[word-break:break-word] font-['Roboto_Mono:Medium'] font-medium leading-[normal] relative shrink-0 text-[7.667px] text-[color:var(--color\/white,white)] whitespace-nowrap" data-node-id="55:95">
            200
          </p>
        </div>
      </div>
      <div className="content-stretch flex gap-[5.367px] items-center overflow-clip px-[9.967px] py-[6.134px] relative rounded-[765.933px] shrink-0" data-node-id="55:96" data-name="nav/Settings">
        <div className="relative shrink-0 size-[11.5px]" data-node-id="55:97" data-name="icon/sliders">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconSliders} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[9.967px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="55:99">
          Settings
        </p>
      </div>
      <div className="flex-[1_0_0] h-[0.767px] min-w-px relative" data-node-id="55:100" data-name="spacer" />
      <div className="bg-[var(--color\/nav-active,#1f2937)] content-stretch flex gap-[1.533px] items-start overflow-clip p-[2.3px] relative rounded-[765.933px] shrink-0" data-node-id="55:101" data-name="Mode switch">
        <div className="content-stretch flex items-start overflow-clip px-[9.967px] py-[4.6px] relative rounded-[765.933px] shrink-0" data-node-id="55:102" data-name="Group">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[9.584px] text-[color:var(--color\/nav-text,#b8c0cc)] whitespace-nowrap" data-node-id="55:103">
            Simple
          </p>
        </div>
        <div className="bg-[var(--color\/accent,#2563eb)] content-stretch flex items-start overflow-clip px-[9.967px] py-[4.6px] relative rounded-[765.933px] shrink-0" data-node-id="55:104" data-name="Group">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[9.584px] text-[color:var(--color\/white,white)] whitespace-nowrap" data-node-id="55:105">
            Advanced
          </p>
        </div>
      </div>
      <div className="content-stretch flex gap-[4.6px] items-center overflow-clip pl-[10.734px] relative shrink-0" data-node-id="55:106" data-name="Group">
        <div className="relative shrink-0 size-[4.6px]" data-node-id="55:107" data-name="Ellipse">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
        </div>
        <p className="[word-break:break-word] font-['Roboto_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[8.05px] text-[color:var(--color\/nav-text,#b8c0cc)] tracking-[0.322px] whitespace-nowrap" data-node-id="55:108">
          LOCAL BETA 0.3
        </p>
      </div>
    </div>
  );
}
