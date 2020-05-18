import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import {FaEnvelope, FaFacebook, FaTwitter} from "react-icons/fa"
import {ShareBlock, ShareButtonIconOnly} from "react-custom-share"

const ShareBlockStyle = styled.div`

    display: flex;
    flex-direction: row;
    margin-left: ${props => props.withNative ? '-1rem' : '0'};
    
  .rcs-button {
    outline: 0;
  }
  
  .rcs-buttons {
    align-self: flex-start;
    display: inline-flex;
  }

  .rcs-button:first-of-type {
    margin-left: 0;
  }
`;

const CustomShareBlock = props => {
    const { url, title, siteName } = props;
    let nativeShare = null;
    if (typeof window !== 'undefined' && window.navigator && window.navigator.share) {
      // once this api is more common^^
    }

    const shareBlockProps = {
        url: url,
        button: ShareButtonIconOnly,
        buttons: [
            { network: "Twitter", icon: FaTwitter },
            { network: "Facebook", icon: FaFacebook },
            // { network: "Linkedin", icon: FaLinkedin },
            { network: "Email", icon: FaEnvelope }
        ],
        text: title,
        longtext: siteName
    };
    return (
      <>
        <ShareBlockStyle className="mt-4" withNative={nativeShare !== null}>
          <div className="rcs-buttons">
            <ShareBlock {...shareBlockProps} />
          </div>



        </ShareBlockStyle>

        <i>If you like it, share it! :)</i>

        <br />
        <br />
        </>
    )
};

CustomShareBlock.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    siteName: PropTypes.string
};

CustomShareBlock.defaultProps = {
    url: "https://mywebsite.com/page-to-share/",
    title: "Default value of title",
    siteName: "Default value of excerpt"
};

export default CustomShareBlock;

