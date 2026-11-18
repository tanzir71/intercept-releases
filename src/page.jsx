import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import Utility from './section-52-4.jsx';
import Nav from './section-52-9.jsx';
import Hero from './section-52-28.jsx';
import InPage from './section-52-416.jsx';
import Coverage from './section-52-436.jsx';
import Overview from './section-52-489.jsx';
import CapabilitiesHeading from './section-55-19.jsx';
import Titlebar from './section-55-33.jsx';
import AppNav from './section-55-47.jsx';
import AppHeading from './section-55-110.jsx';
import Kpis from './section-55-120.jsx';
import Detection from './section-55-235.jsx';
import Chart from './section-55-400.jsx';
import InputRow from './section-55-913.jsx';
import AgentRow from './section-55-1264.jsx';
import AlertRow from './section-55-1681.jsx';
import AdvancedRow from './section-55-1964.jsx';
import ModesHeading from './section-56-157.jsx';
import SimpleMode from './section-56-165.jsx';
import AdvancedDescription from './section-56-1433.jsx';
import SmallTitlebar from './section-56-555.jsx';
import SmallNav from './section-56-569.jsx';
import SmallHeading from './section-56-632.jsx';
import SmallKpis from './section-56-642.jsx';
import SmallDetection from './section-56-757.jsx';
import SmallChart from './section-56-922.jsx';
import Agents from './section-56-1454.jsx';
import Confirmations from './section-56-1555.jsx';
import Security from './section-57-221.jsx';
import Facts from './section-57-352.jsx';
import Requirements from './section-57-367.jsx';
import FAQ from './section-57-412.jsx';
import CTA from './section-57-467.jsx';
import Footer from './section-57-482.jsx';

export default renderToStaticMarkup(<>
  <Utility/><Nav/>
  <main>
    <Hero/><InPage/><Coverage/>
    <section id="overview"><Overview/></section>
    <section id="capabilities" className="wide-section muted"><CapabilitiesHeading/>
      <div className="product-stage"><p className="stage-label">ADVANCED MODE · SAMPLE DATA</p>
        <div className="advanced-preview showcase" aria-label="Advanced mode with sample data"><Titlebar/><AppNav/>
          <div className="advanced-content"><AppHeading/><Kpis/><Detection/><Chart/></div>
        </div>
      </div>
    </section>
    <section id="features" className="wide-section feature-rows"><InputRow/><AgentRow/><AlertRow/><AdvancedRow/></section>
    <section id="modes" className="wide-section muted"><ModesHeading/>
      <div className="mode-grid"><SimpleMode/>
        <div className="mode-card"><div className="mode-thumb"><div className="small-advanced showcase" aria-label="Advanced overview with sample data">
          <SmallTitlebar/><SmallNav/><div className="small-content"><SmallHeading/><SmallKpis/><SmallDetection/><SmallChart/></div>
        </div></div><AdvancedDescription/></div>
      </div>
    </section>
    <section id="agents"><Agents/></section>
    <section id="confirmations"><Confirmations/></section>
    <section id="security"><Security/></section>
    <Facts/>
    <section id="requirements"><Requirements/></section>
    <section id="faq"><FAQ/></section>
    <section id="download"><CTA/></section>
  </main><Footer/>
</>);
