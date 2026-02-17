"use client";
import React, { useEffect } from "react";

export default function TermsAndConditions() {
  useEffect(() => {
    // Set a flag in localStorage to indicate the T&C page was visited
    if (typeof window !== "undefined") {
      localStorage.setItem("tncVisited", "true");
    }
  }, []);
  return (
    <div dangerouslySetInnerHTML={{ __html: `
<!DOCTYPE html>
<html lang=\"en\">
<head>
<meta charset=\"UTF-8\">
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
<title>SIMATS EmpowerHER Awards 2026 - Terms & Conditions</title>
<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\">
<style>
body { font-family: Arial, sans-serif; }
.hero { background: linear-gradient(135deg,#6a11cb,#ff4fa3); color: white; padding: 80px 20px; text-align: center; }
.section { padding: 50px 20px; }
.section-title { margin-bottom: 30px; font-weight: bold; }
footer { background: #111; color: white; padding: 20px; text-align: center; }
.table th { background: #6a11cb; color: white; }
.back-btn {
  display: block;
  margin: 40px auto 32px auto;
  padding: 14px 36px;
  background: linear-gradient(90deg,#C41E7F,#D4AF37);
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(196,30,127,0.08);
  transition: background 0.2s, transform 0.2s;
  text-decoration: none;
}
.back-btn:hover {
  background: linear-gradient(90deg,#D4AF37,#C41E7F);
  color: #fff;
  transform: scale(1.04);
}
</style>
</head>
<body>
 <div class="text-center mb-3">
  <img 
    src="/logo.png" 
    alt="Logo" 
    style="display: block; margin-left: auto; margin-right: auto; margin-bottom: 1.5rem; width: 150px; max-width: 42vw; height: auto; object-fit: contain; box-shadow: 0 4px 16px rgba(0,0,0,0.08);"
  />
</div>
</nav>
<section class=\"hero\">


<h1>SIMATS EmpowerHER Awards 2026</h1>
<p>Official Terms & Conditions</p>
</section>
<div class=\"container section\">
<h2 class=\"section-title\">TERMS & CONDITIONS FOR SIMATS EMPOWERHER AWARDS 2026</h2>
<h3>1. Definition</h3>
<table class="table table-bordered">
<tr><th>Term</th><th>Description</th></tr>
<tr><td>Listing</td><td>SIMATS EmpowerHER Awards 2026</td></tr>
<tr><td>Management</td><td>Bennett Coleman & Co. Ltd / or organizers are responsible for the overall conduct of the listing</td></tr>
<tr><td>Participant</td><td>Women professionals, entrepreneurs, and artists residing in India since the past two years as on December 31, 2025 are eligible to participate.</td></tr>
<tr><td>Jury</td><td>A group of experts identified by Management for evaluation/review of the entries based on pre-defined evaluation parameters.</td></tr>
<tr><td>Terms and conditions</td><td>The terms governing the listing, as may be amended from time to time by the Management.</td></tr>
<tr><td>Website and its T&C & Privacy</td><td>Insert website link – To be updated</td></tr>
<tr><td>Contact ID</td><td>Insert Contact ID / Number – to be updated</td></tr>
</table>
<ol style="margin-left:1.5em; margin-bottom:2em;">
  <li><b>1.1</b> By participating in the Women Impact Awards 2026, the Participant agrees to abide by and be bound by these Terms.</li>
  <li><b>1.2</b> These Terms may be modified without any prior written notification. Participant is advised to regularly review these Terms uploaded on the Website. If there is any disagreement with any of the Terms and any amendments thereto, Participant must not participate in the listing</li>
  <li><b>1.3</b> The process and gratification for the listing thereof may be changed/modified/split/ merged /increased / decreased or cancelled by the Management based on the number and quality of entries received</li>
  <li><b>1.4</b> The management reserves the right to add or remove nominations in any category based on the quality of entries received in that category</li>
  <li><b>1.5</b> If no Participants are found to be worthy of inclusion by the Management, the reward may be cancelled. The decision of the Management in this regard will be final and binding. The Management will not entertain any queries in this regard.</li>
</ol>
<h3>2. Objective of the awards</h3>
<p>2.1 Recognise and honour women who have made significant contributions to the social, economic, cultural, scientific, or public development of India, reflecting the country’s commitment to celebrating women professionals who are leading positive change.</p>
<h3>3. Eligibility criteria</h3>
<ul>
<li>3.1 Woman professional/entrepreneur/artist residing in India since the past two years as on December 31, 2025 can participate.</li>
<li>3.2 The initiative/innovation applied for the awards should be implemented between January 01, 2024 to December 31, 2025 with sustained impact falling in the  last two years.</li>
<li>3.3 Women professionals should be associated with the organisation for minimum two years as on December 31, 2025 and should produce an ‘NOC’ from the organisation for participating in the awards and approval on all the claims/achievements mentioned in the application form </li>
<li>3.4	Women entrepreneurs participating in the awards should be associated with the organisation for minimum three years as on December 31, 2025 with minimum 30% equity in the firm</li>
<li>3.5 One nominee can apply for maximum two categories.</li>
</ul>
<h3>4. Categories</h3>
<div style="margin-bottom:2rem">
  <h4 style="color:#C41E7F; font-weight:bold;">A) Professionals & Leaders (8 categories)</h4>
  <ol style="margin-left:1.5em;">
    <li><b>1) Women in Healthcare Excellence (Clinical / Hospital / Public Health)</b>
      <ul>
        <li><b>Definition:</b> Recognizes a woman leading measurable improvements in care quality, patient safety, outcomes, or access.</li>
        <li><b>Who can apply?</b> Doctors/nurses/administrators/public health leaders in India.</li>
      </ul>
    </li>
    <li><b>2) Women in MedTech / HealthTech Innovator</b>
      <ul>
        <li><b>Definition:</b> Built or deployed a tech solution improving diagnosis, care delivery, hospital operations, or health access.</li>
        <li><b>Who can apply?</b> CTO/product owner/research lead; solution piloted/deployed in India.</li>
      </ul>
    </li>
    <li><b>3) Women in STEM Research & Applied Innovation</b>
      <ul>
        <li><b>Definition:</b> Researcher translating work into patents, publications, prototypes, or industry adoption.</li>
        <li><b>Who can apply?</b> Academia/R&D labs/corporate R&D</li>
      </ul>
    </li>
    <li><b>4) Women in Education Transformation</b>
      <ul>
        <li><b>Definition:</b> Improved learning outcomes, employability, or access (especially for girls/underserved).</li>
        <li><b>Who can apply?</b> School/college leaders, edtech leaders, administrators, principals.</li>
      </ul>
    </li>
    <li><b>5) Women in Manufacturing & Operations Excellence (Industrial backbone)</b>
      <ul>
        <li><b>Definition:</b> Excellence in plant leadership, quality, safety, lean, supply chain, productivity.</li>
        <li><b>Who can apply?</b> Manufacturing/ops leaders in auto/ancillaries/textiles/electronics/chemicals etc.</li>
      </ul>
    </li>
    <li><b>6) Women in Sustainability & Climate Action</b>
      <ul>
        <li><b>Definition:</b> Measurable climate-positive outcomes (energy, water, waste, circularity, biodiversity).</li>
        <li><b>Who can apply?</b> Corporate/NGO/entrepreneur/public sector.</li>
      </ul>
    </li>
    <li><b>7) Women in Tech Management (AI, Data, Cyber, Product)</b>
      <ul>
        <li><b>Definition:</b> Senior tech leader delivering business impact through technology programs.</li>
        <li><b>Who can apply?</b> IT/ITES employees, GCCs, product managers, coders, any other professionals working in product firms in India.</li>
      </ul>
    </li>
    <li><b>8) Women Professional Innovator of the Year (Any Industry)</b>
      <ul>
        <li><b>Definition:</b> Recognizes a woman professional (not necessarily a founder) who has delivered a breakthrough idea, process, product, program, or business model innovation in her organization/industry, resulting in measurable impact in India.</li>
        <li><b>Who can apply?</b> Corporate professionals, plant/ops leaders, marketers, finance leaders, HR/people leaders, product managers, engineers, consultants, teachers, clinicians, lawyers—any domain</li>
      </ul>
    </li>
  </ol>
</div>
<div style="margin-bottom:2rem">
  <h4 style="color:#C41E7F; font-weight:bold;">B) Entrepreneurs & MSMEs (4 categories)</h4>
  <ol start="9" style="margin-left:1.5em;">
    <li><b>9) Women Entrepreneur of the Year (All industries)</b>
      <ul>
        <li><b>Definition:</b> Recognizes a woman founder who has scaled a business with strong revenue/market expansion, sustainable operations, and meaningful job creation in India.</li>
        <li><b>Who can apply?</b> Founder/co-founder; operating 3+ years, Revenue of the organisation-More than 500cr as on March 31, 2025</li>
      </ul>
    </li>
    <li><b>10) Women-led MSME Champion (Traditional sectors: textiles, food, trading, services)</b>
      <ul>
        <li><b>Definition:</b> Celebrates a woman running an MSME in sectors like textiles, manufacturing ancillaries, food, trading or services, demonstrating modernization, resilience, and local employment impact.</li>
        <li><b>Who can apply?</b> MSME owner/operator in India operating 3+ years with upto 500cr revenue as on March 31, 2025 and should have a MSME/Udhyam registration certificate</li>
      </ul>
    </li>
    <li><b>11) Women Founder in DeepTech / IP-led Innovation</b>
      <ul>
        <li><b>Definition:</b> Honors a founder building defensible innovation (biotech, medtech, materials, robotics, diagnostics, cleantech) with prototypes/pilots and clear commercialization potential.</li>
        <li><b>Who can apply?</b> Start-ups with minimum 100cr revenue and less than 10years of incorporation as on December 31, 2025 along with valid DPIIT certificate. Ideation or WIP products/services are not allowed to participate</li>
      </ul>
    </li>
    <li><b>12) Grassroots Woman Social Changemaker</b>
      <ul>
        <li><b>Definition:</b> Honors a grassroots leader creating proven community outcomes in health, education, livelihoods, safety, inclusion, or empowerment—especially at district/block level.</li>
        <li><b>Who can apply?</b> NGO leaders, SHG leaders, frontline leaders in India.</li>
      </ul>
    </li>
  </ol>
</div>
<div style="margin-bottom:2rem">
  <h4 style="color:#C41E7F; font-weight:bold;">C) Arts, Culture & Entertainment (Celebrity-friendly) – 3 categories</h4>
  <ol start="13" style="margin-left:1.5em;">
    <li><b>13) Rising Star – Indian Cinema/OTT (Under 35)</b>
      <ul>
        <li><b>Definition:</b> Recognizes a breakthrough woman talent in Indian cinema/OTT who has delivered standout work in the last 12–24 months and shows exceptional promise for a sustained career.</li>
        <li><b>Who can apply?</b> Under 35; at least 1 major credited work in last 24 months as on December 31, 2025.</li>
      </ul>
    </li>
    <li><b>14) Excellence in Music (Carnatic / Indie / Film)</b>
      <ul>
        <li><b>Definition:</b> Honours a woman musician (vocalist/instrumentalist/composer) who has demonstrated artistic excellence, strong body of work, and meaningful contribution to India’s music ecosystem.</li>
        <li><b>Who can apply?</b> Vocalist/instrumentalist/composer. Minimum 5 years as a performing/recording artist. At least 2 notable works/performances in last 24 months (albums, concerts, film work, festival headliners, etc.) as on December 31, 2025</li>
      </ul>
    </li>
    <li><b>15) Excellence in Dance & Performing Arts (Bharatanatyam / Folk / Theatre)</b>
      <ul>
        <li><b>Definition:</b> Recognizes a woman performer/choreographer/guru who has excelled in dance or performing arts through outstanding performances, innovation within tradition, and contribution to cultural continuity</li>
        <li><b>Who can apply?</b> Classical (e.g., Bharatanatyam), folk forms, contemporary, theatre-based performance. Minimum 5 years of active practice/performing; significant public showcases in last 24 months as on December 31, 2025</li>
      </ul>
    </li>
  </ol>
</div>
<h3>03. Winner selection process</h3>
<ul>
<li><strong>3.1</strong> The entries that qualify based on the defined eligibility criteria shall be presented to the Jury. The decision by the Jury as confirmed by Management shall be final and binding</li>
<li><strong>3.2</strong> The shortlisted entries as well as the winning entries may be featured or covered by the Management or brief thereof may be featured on the Website and/or any other platform/media at the sole discretion of the Management</li>
<li><strong>3.3</strong> No correspondence of whatsoever nature relating to shortlisting of entries or selection of winning entries shall be entertained</li>
<li><strong>3.4</strong> Management shall screen or display the entries for the Jury</li>
<li><strong>3.5</strong> The Jury shall select the top finalist along with the winners</li>
</ul>
<h3>04. Winner declaration</h3>
<ul>
<li><strong>4.1</strong> The management reserves the right to offer or withdraw any of the prizes/rewards/gratification as provided herein, at any point of time, including after they have been announced.</li>
<li><strong>4.2</strong> The management shall have the liberty, but not the obligation, to publish information with respect to the submission/entries made by the Participants.</li>
<li><strong>4.3</strong> Participants declare that the details furnished in the application form and supporting documents submitted for the listing are true, correct, and complete and, wherever required, provided after thorough due diligence and inquiry. In case any of the said information is found to be false or untrue or misleading or misrepresenting, the Participant will be liable and accountable for any consequences resulting thereto including indemnifying the Management for any expenses, costs, losses, damages incurred.</li>
<li><strong>4.4</strong> The Participant authorizes the Management to use the content submitted as part of nomination/ participation, in whole or in part and use and display such content and entry, which shall include trade publications, press releases, electronic and/or social media posting to any website, electronic hyperlinks to the website of the Participant, and/or any other display format selected by the Management during the ceremony or at a later point in time as it may deem fit.</li>
<li><strong>4.5</strong> The management may, in its sole discretion, exclude a Participant from participating in any part of the listing process on various grounds, which may include without limitation (i) circumstances which renders the Participant unfit to participate therein; (ii) inability to produce documentation specified proving the identity of the Participant; (iii) any other reason that, at their sole discretion, would adversely impact the listing. At no point of time will the management be obliged to notify unsuccessful Participants of its decision</li>
<li><strong>4.6</strong> The Management is not responsible if a call to a winner is not successful due to:<br>
<ul style="list-style-type: lower-alpha; margin-left: 2em;">
  <li>Line being busy</li>
  <li>Congestion</li>
  <li>No answer received</li>
  <li>Poor call conditions / unclear reception</li>
  <li>Number engaged</li>
  <li>Call drop</li>
  <li>E-mail not delivered</li>
  <li>Other reasons that could render a call unsuccessful or terminate it</li>
</ul>
<li><strong>4.7</strong> The Management further reserves the right to replace, at its discretion, any winner(s) who for any reason fails or is disqualified from or is unable to successfully participate in the listing or breaches any Terms, with another Participant who should be eligible to be a winner.</li>
<li><strong>4.8</strong> The Management will endeavor to reach out to winners within 30 days from winner declaration to obtain details and documentation, if any, to initiate the registration process for the prize, if applicable. The Management will make a maximum of 3 attempts to get in touch with such winner. Failure to contact the winner may result in forfeiture of the prize for such Participant and the Management may allocate the same to subsequent eligible Participant with highest score.</li>
<li><strong>4.9</strong> The Management will use the e-mail used to register for the listing by the Participant, to identify the winner of the prizes won, if any. Inability on the part of the Participant to accordingly show or provide the required identification proof could entitle Management to disqualify the Participant from any winnings, if any.</li>
<li><strong>4.10</strong> The Management shall make reasonable endeavors to (i) enable Participant(s) to proceed with participation in the listing (ii) to contact all winner(s) at each relevant juncture of the listing process, the Management can make no guarantee thereof and Management shall in its sole discretion be entitled to proceed with the next entitled Participants who are eligible to be winners under the Terms, in case it is unable to successfully contact and communicate with Participants(s)/ winner(s) in terms hereof.</li>
<li><strong>4.11</strong> The Management will have no liability to a Participant who is unable to take part in the listing, for whatever reason and the Management shall be entitled to disqualify the Participant(s) from the listing, at any time, at the discretion of Management</li>
<li><strong>4.12</strong> The Management further reserves the right to replace, at its discretion, any winner(s) who for any reason fails or is disqualified from or is unable to participate in the listing, with another Participant, notwithstanding that such Participant may have been previously eliminated from the listing and each Participant shall agree to collect the prize as and when required by Management to do so</li>
<li><strong>4.13</strong> If at any point, it is determined by the Management that any person has tampered with the Website, or any data / servers / database / etc. related to the listing process, the Management reserves the right at its discretion to revoke or winnings/prizes of any such Participants and / or initiate litigation as deemed fit and necessary by the Management</li>
<li><strong>4.14</strong> The Management will reach out to winners within 30 days from winner declaration to obtain details and documentation, if any, to initiate the registration process for the prize, if applicable. Management will determine delivery of the prize in consultation with the other partners of the platform and based on what is made available. Neither the Management nor the partners will be responsible should the winners refuse to accept the prize as made available.</li>
<li><strong>4.15</strong> Winners who have won the prizes will receive a communication regarding the prizes via email on the registered email id, from the Management, or on the Website. The details will be intimated by Management to each such winner on the email id provided by them at the time of registration on Website, on a best effort basis. Any prizes not collected / claimed within 30 days will be forfeited and the winners will be disqualified.</li>
<li><strong>4.16</strong> The winners, in order to claim/ redeem prizes will be required to send attested copies of a valid photo ID proof issued by the Government with address (passport, or any other Government identity proof, etc.) and any other documents that will be required within the stipulated time. </li>
<li><strong>4.17</strong> The winner agrees that the delivery of the prize may be delayed as a result of a delay in submission of documents and/ or any force majeure events which are not within the control of Management, including but not limited to the orders/notifications/restrictions/prohibitions by the Government of India/other countries and the respective States/Union Territories, aimed at containment of the spread of COVID-19.</li>
<li><strong>4.18</strong> The winners / grand prize winner hereby agrees that he/ she shall not hold the Management responsible for any delays and/ or disputes and/or claims arising out of the prize and shall indemnify the Management against any and all such claims. </li>
<li><strong>4.19</strong> The winners hereby agree that any in case of any disputes/ claims arising out of the prize, the same shall be addressed directly to the Management.</li>
<li><strong>4.20</strong> The Management may refuse to gratify the winners in the event of any fraud, dishonesty, or non-entitlement on the part of any of such Winner(s) to participate in the listing, under the Terms. </li>
</ul>
<h3>05. Prohibited Activities</h3>
<ul>
<li><strong>5.1</strong> Viruses, trojan horses, worms, time bombs, corrupted files, malware, spyware, or any other similar software that may damage the operation of another’s computer or property</li>
<li><strong>5.2</strong> Using the Website in any manner intended to damage, disable, overburden, or impair any server, or the network(s) connected to any server, or interfere with any other party’s use and enjoyment of the Website</li>
<li><strong>5.3</strong> Attempting to gain unauthorized access to the Website, other accounts, computer systems or networks connected to any server through hacking, password mining or any other means.</li>
<li><strong>5.4</strong> Obtaining or attempting to obtain any materials or information stored on the Website, its servers, or associated computers through any means not intentionally made available through the Website</li>
</ul>
<h3>06. Phases and Dates</h3>
<table class="table table-bordered">
<tr><th>Event</th><th>Date</th></tr>
<tr><td>Submission Opening</td><td>13<sup>th</sup> February, 2026</td></tr>
<tr><td>Awards ceremony date</td><td>8<sup>th</sup> March, 2026</td></tr>
</table>
<ul>
<li><strong>6.1</strong> The above-mentioned schedule could be added to, modified, or cancelled based on technical requirements and in case the determination of the list is for any reason rescheduled, extended, cancelled, or terminated early and same shall be the absolute sole discretion of Management</li>
<li><strong>6.2</strong> All applications received will be evaluated based on pre-defined evaluation criteria determined by the Management in its sole and absolute discretion</li>
<li><strong>6.3</strong> The decision taken by the Management, based upon the observation & recommendations of Jury with respect to the evaluation/disqualification/qualification is final and binding on all Participants. No claims/queries raised with respect to the same will be entertained in this regard</li>
</ul>
<h3>07. Limitations & Disclaimers</h3>
<ul>
<li><strong>7.1</strong> The Management will not be responsible for late/ incomplete/ corrupted/ defective entries and/or which cannot be read or viewed for any reason, and such Entries shall stand automatically disqualified.   The Management shall not be responsible if for any technical, physical, or other reasons, the Entry is not received or cannot be read/ viewed/ judged.</li>
<li><strong>7.2</strong> The Management reserve their right to suspend, cancel or modify, add to, or truncate these Terms & Conditions or listing and/or rules relating thereto at any time without notice.  Participants shall periodically check this page for updating of these Terms & Conditions.</li>
<li><strong>7.3</strong> The Management gives no warranties in respect of any aspect of the listing, or any materials related thereto or offered at the Award Ceremony and, to the fullest extent possible under the laws governing this Agreement, disclaims all implied warranties, including but not limited to warranties of fitness for a particular purpose, accuracy, timeliness, and merchantability. The listing is provided on an “as-is” basis. The Management does not accept any responsibility or liability for reliance by you or any person on any aspect of the listing or any information provided during the listing process.</li>
<li><strong>7.4</strong> The Management does not make any warranty that the listing and/or emanating results will meet Participant’s expectations.</li>
</ul>
<h3>08. General</h3>
<ul>
<li><strong>8.1</strong> Participant agrees that the Participant is legally capable of entering and, if selected, participating in the listing and agree to the Terms & Conditions</li>
<li><strong>8.2</strong> Participant understands and agrees that merely participating in this listing process does not entitle the Participant to a prize or to any other form of consideration</li>
<li><strong>8.3</strong> Participant shall be completely responsible for handling any infringement or alleged infringement and shall indemnify Management from any claims, costs or damages from infringement or alleged infringement of the logo or trademark or the defines of a claim or any costs payable thereof.</li>
<li><strong>8.4</strong> Participants for the purpose of entering the listing, automatically grants the Management a royalty-free, irrevocable, worldwide, non-transferable, non-exclusive right and license to use and display such entry, for participation in the listing, and any intellectual property in relation to and arising out of such participation in the listing and footage thereof, which shall include trade publications, press releases, electronic posting to the Website, the Website in any display format selected during the listing process as it deems fit.</li>
<li><strong>8.5</strong> The Management reserve the right to, at its discretion, withdraw or amend or add to the Terms & Conditions of the listing at any time, with prospective or retrospective effect, and does not take responsibility for any loss or damage that any individual or organization may suffer because of participating or attempting to participate in the listing, the gratification being withdrawn, or its rules amended</li>
<li><strong>8.6</strong> Should a Participant wish to withdraw from the listing, kindly inform the Management in writing on Website to be added at any time up to one week prior to the final ceremony date</li>
<li><strong>8.7</strong> All disputes relating to or arising out of the listing process shall be subject to the laws of India, and shall be subject to the exclusive jurisdiction of the courts of competent jurisdiction at New Delhi, India</li>
<li><strong>8.8</strong> In the event these terms and conditions do not cover any question or complaint in relation to the listing, the same will be concluded on by the Management (for all other issues) or an independent body or legal team as appointed by the Management and deemed necessary</li>
</ul>
<h3>09. Website</h3>
<ul>
<li><strong>9.1</strong> The Website is only an informational website: Website to be added for the listing. The Management is not liable or responsible for any action or decision taken by Participant or anyone acting on Participant’s behalf or under Participant employment or under contract with Participant. The Management shall not be under any obligation to Participant and Participant shall have no obligation or rights in relation to the listing and shall have no claims whatsoever against the Management relating to the selection process or the running of the listing process</li>
<li><strong>9.2</strong> The Management shall not be responsible for:<br>
i. any delivery, failures relating to the registration or uploading videos/presentations.<br>
ii. any SPAM generated messages as result of Participant accessing the Website.<br>
iii. Management not receiving or rejecting any data.<br>
iv. any lost, late, or misdirected computer transmission or network, electronic failures of any kind or any failure to receive entries owing to transmission failures or due to any technical reasons and<br>
v. Other conditions/situations or failures beyond its control
</li>
</ul>

<h3>10. Disclaimers</h3>
<ul>
<li><strong>10.1</strong> The Management has no obligation to screen the entry material in advance and is not responsible for monitoring entries for the purpose of preventing violation of intellectual property ownership rights, or violations of any law, rule, or regulation. If the Management is notified of submissions or materials that may not conform to the rules, it may investigate the allegation and determine in good faith and in its sole discretion whether to eliminate such an entry from consideration. The Management has no liability or responsibility to Participants or other users of the Website for performance or non-performance of such activities.</li>
<li><strong>10.2</strong> The Management failure to exercise any right shall not be deemed a waiver of any further rights. The Management shall not be liable for any failure to perform its obligations where such failure results from any cause beyond Management’s reasonable control. If any provision of this Agreement is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary for this Agreement to otherwise remain in full force and effect and enforceable. This Agreement is not assignable, transferable, or sub-licensable by you except with Management prior written consent. This Agreement shall be governed by the internal laws of the India and the parties shall submit to the exclusive jurisdiction of the courts located in New Delhi, India</li>
<li><strong>10.3</strong> Both parties agree that this Agreement is the complete and exclusive statement of the mutual understanding of the parties and supersedes and cancels all previous written and oral agreements, communications and other understandings relating to the subject matter of this Agreement, and that all modifications must be in a writing signed by both parties, except as otherwise provided herein.</li>
<li><strong>10.4</strong> No agency, partnership, joint venture, or employment is created because of this Agreement, and you acknowledge that you do not have any authority of any kind to bind Management in any respect whatsoever.</li>
<li><strong>10.5</strong> The Participant hereby agrees and undertakes not to hold the Management and/or or any of their group entities or affiliates, their respective directors, officers, employees, agents, vendors, responsible for or liable for, any actions, claims, demands, losses, damages, costs, charges and expenses that the Participant may/might have suffered, sustained or incurred, or claims to suffer, sustain or incur, by way of and /or on account of participation in the listing or related to the prize in any manner whatsoever.</li>
</ul>

<h3>11. Systems and availability</h3>
<ul>
<li><strong>11.1</strong> The Management, its affiliates, process advisors, contractors, partners and promotion are not responsible for technical, hardware, software, or other communications malfunctions, errors or failures of any kind, lost or unavailable network connections, Website, Internet, or ISP availability, unauthorized human intervention, traffic congestion, incomplete or inaccurate capture of information (regardless of cause) or failed, incomplete, garbled, jumbled or delayed computer transmissions which may limit Participants / Participant’s ability to participate, including any injury or damage to Participants or any other person's computer or mobile device relating to or resulting from participating in or downloading any materials. Management is not responsible for lost, late, illegible, incomplete, invalid, unintelligible, technically corrupted, or misdirected answers, which will be disqualified. Management shall attempt to use commercially reasonable efforts to ensure the security and accuracy of all answer’s personal details (provided, however, that Participants acknowledge and agree that such methodologies are not infallible, and that the organizers make no guarantee as to their effectiveness).</li>
<li><strong>11.2</strong> Any loss or outrage or dissatisfaction suffered by the course of the process by a Participant would not be the responsibility of Management and/or its associates/ affiliates and Management or its associates/affiliates will not be responsible to make good any such loss or dissatisfaction.</li>
<li><strong>11.3</strong> All attempts will be made to protect the data from loss and corruption, but in the event such data loss happens, Management may have to continue with whatever data is available, or in any other manner as it may deem reasonable. Management should not be held responsible for any loss of data, or the action taken on account of the same. Management will not be held responsible to make good any such loss or dissatisfaction on account of such loss.</li>
<li><strong>11.4</strong> Prior to start of the application for the listing, the Participant must check that the Websites are operational and functioning correctly. The Participant is advised to keep adequate RAM and phone memory available to ensure smooth functioning of the Website</li>
<li><strong>11.5</strong> The server used to communicate with the Participant has adequate redundancies built into it. However, in the rare cases, the server is down during the call for entry period, the Management will, at its discretion but not as an obligation, determine such measures as it may deem fit</li>
<li><strong>11.6</strong> The Participant acknowledges that all possible issues may not have been identified by Management and its partners and agrees to hold harmless Management and its partners for the application, network, process, technical or any other failures. Any losses, injury, discomfort, loss of privacy, inability to participate or any other discomfort of any sort caused to the participant or the participant’s property, or device shall not be the responsibility of Management or its partners.</li>
<li><strong>11.7</strong> No person (i.e., either the Participant, or any person on behalf of the Participant) shall initiate litigation against the Management or its partners in any manner. In the event the Participant has any grievance with respect to the listing/competition/prizes shall provide its grievance/complaint to Website to be added and decision of the Management towards grievance redressal shall be final and binding upon the Participant.</li>
<li><strong>11.8</strong> The Management shall not be liable for any failure of the application server or system during the listing process.</li>
</ul>



<h3>12. Publicity</h3>
<ul>
<li><strong>12.1</strong> The Participant, by providing the aforesaid sensitive personal information hereby voluntarily agree that Management shall have the right to share the information so collected with such other third party as required for the purpose of the listing and hereby agree that they shall not file any claim against Management for sharing of such personal information. Any information shared by the Participant to Management shall be handled by Management in terms of the privacy policy of Management.</li>
<li><strong>12.2</strong> By entering the listing, Participant agree to participate in any media or promotional activity resulting from the listing as reasonably requested by the Management at their expense and agree and consent to use of their name and/or likeness by the Management.</li>
<li><strong>12.3</strong> The Management will contact Participants in advance of any Management media request for interviews. The entries may also be used for promotional, marketing, press and media purposes and Participants agrees to waive any rights and not assert any intellectual property rights that they have or may have in the entries submitted for the listing. The Management reserves the right to publish the name and likeness of the Participants, the finalists, and the winners of the listing on Website or through other media for publicity purposes. Participants acknowledge that they will not be paid for use of name and/or likeness or entry submissions and hereby relinquish (and with respect to its company, if applicable) any past, present, or future monetary or other claims against Management and its affiliates for this use.</li>
<li><strong>12.4</strong> None of the Participants shall, without the prior written approval of the Management, speak to the press or any other media or any third person, nor give any interviews or comments relating to any aspect of the listing. The Participant shall not disclose any information whatsoever relating to Management to any other party.  Violation of this clause shall immediately disqualify the Participant’s prospects of further participation.</li>
<li><strong>12.5</strong> The Participant shall always keep confidential all particulars and details regarding the listing</li>
<li><strong>12.6</strong> Any photographs, videos etc. submitted by the Participant s/winners to Management or recorded, shall on submission/creation become the property of Management and shall be available to Management for exploitation across all mediums throughout the world in perpetuity. The Participant (s) shall ensure that the photos or videos submitted by them in any public domain, or their performances shall not be obscene, vulgar, defaming, denigrating women, or children, hurting religious sentiments, depicting violence or shall not infringe the rights of a third person. The Participant (s) shall solely remain liable for any action (criminal/civil) arising therefrom.</li>
<li><strong>12.7</strong> Acceptance of these terms & conditions by the Participant constitutes permission for Management, including its affiliates, to click photographs, record videos of the Participant (s) and use the Participant (s) name, photographs, likeness, voice, and comments for advertising and promotional purposes in any media worldwide for purposes of advertising and trade without any compensation whatsoever.</li>
</ul>

<h3>13. Privacy</h3>
<ul>
<li><strong>13.1</strong> Participants voluntarily agree that personal data submitted with an entry, including name, mailing address, phone number, and email address may be collected, processed, stored, and otherwise used by the Management and its affiliates for the purposes of conducting and administering the listing process. By entering the listing, Participant agree to the transmission, processing, disclosing and storage of this personal data by Management and its affiliates. All personal information that is collected from the Participant is subject to Top 30 Talent Leaders of 2023 Privacy Policy, located at: Website to be added.</li>
</ul>

<h3>14. Warranty and indemnity</h3>
<ul>
<li><strong>14.1</strong> Participants warrant that their entry submission is their own original work and, as such, they are the sole and exclusive owner and rights holder of the entry submitted and that they have the right to submit the entry in the listing and grant all required licenses. Each Participant agrees not to submit any entry that: (a) infringes any third-party proprietary rights, intellectual property rights, industrial property rights, personal or moral rights or any other rights, including without limitation, copyright, trademark, trade names, industrial designs, patent, trade secret, privacy, publicity, or confidentiality obligations; or (b) otherwise violates applicable state, federal, or local law</li>
<li><strong>14.2</strong> To the maximum extent permitted by law, Participant indemnifies and agrees to always keep indemnified Management from and against any liability, claims, demands, losses, damages, costs, and expenses resulting from any act, default, or omission of the Participant and/or a breach of any warranty set forth herein. To the maximum extent permitted by law, Participant agrees to defend, indemnify and hold harmless Management from and against any and all claims, actions, suits or proceedings, as well as any and all losses, liabilities, damages, costs and expenses (including reasonable attorney’s fees) arising out of or accruing from: (i) any entry submission or other material uploaded or otherwise provided by Participant that infringes any copyright, trademark, trade secret, trade dress, patent or other intellectual property right of any person or defames any person or violates their rights of publicity or privacy; (ii) any misrepresentation made by Participant in connection with the listing; (iii) any non-compliance by Participant with these Terms; (iv) claims brought by persons or entities other than the parties to these Terms arising from or related to Participant’s involvement with the listing; (v) acceptance, possession, misuse or use of any prize or participation in any activity related to the listing or participation in the listing; (vi) any malfunction or other problem with the listing Website in relation to the entry and participation in the listing by Participant; (vii) any error in the collection, processing, or retention of entry or voting information in relation to the entry and participation in the listing by Participant and in the voting process by consumers; or (viii) any typographical or other error in the printing, offering or announcement of any prize or winners in relation to the entry and participation in the listing by Participant.</li>
</ul>
  <a href="/register" class="back-btn">&#8592; Back to Registration</a>
</div>
<footer>
<p>© 2026 SIMATS EmpowerHER Awards | All Rights Reserved</p>
</footer>
<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js\"></script>
</body>
</html>
`}} />
  );
}
