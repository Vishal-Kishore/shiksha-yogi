import React from 'react';
import Typewriter from 'typewriter-effect';
import './header.css';

const Header = (props) =>{
    return(
        <div className="intro">

<Typewriter 
          options={{
            strings: [
                '<h3 class="textSans">गुरुर्ब्रह्मा ग्रुरुर्विष्णुः गुरुर्देवो महेश्वरः । <br/> गुरुः साक्षात् परं ब्रह्म तस्मै श्री गुरवे नमः ॥</h3>',
                ,"<h3 class='textSans'>भावार्थ : गुरु ब्रह्मा है, गुरु विष्णु है, गुरु हि शंकर है; गुरु हि साक्षात् परब्रह्म है;<br/> उन सद्गुरु को प्रणाम ।</h3>",

                "<h3 class='textSans'>धर्मज्ञो धर्मकर्ता च सदा धर्मपरायणः ।<br/> तत्त्वेभ्यः सर्वशास्त्रार्थादेशको गुरुरुच्यते ॥</h3>",
                "<h3 class='textSans'>भावार्थ : धर्म को जाननेवाले, धर्म मुताबिक आचरण करनेवाले, धर्मपरायण,<br/> और सब शास्त्रों में से तत्त्वों का आदेश करनेवाले गुरु कहे जाते हैं ।</h3>",
                
                "<h3 class='textSans'>प्रेरकः सूचकश्वैव वाचको दर्शकस्तथा ।<br/> शिक्षको बोधकश्चैव षडेते गुरवः स्मृताः ॥</h3>",
                "<h3 class='textSans'>प्रेरणा देनेवाले, सूचन देनेवाले, ( सच ) बतानेवाले, ( रास्ता ) दिखानेवाले, शिक्षा देनेवाले,<br/> और बोध करानेवाले – ये सब गुरु समान है ।</h3>"

        
        ],
            autoStart: true,
            loop: true,
          }}
        /> 
        { !props.login ? 
        <div className="font">
        <h1 className="text-light">
          <span className="logo-name  mb-2" >Shiksha Yogi</span>
          <br/><br/>
         
          REAL TIME  <span className="live blink"> 
          <span className="dot"></span>
          LIVE POLLING
          </span>
        </h1>
        <h3 className="color">For New Online Generation</h3>
      </div>
     : <></> }
      </div>
    )
}

export default Header;
