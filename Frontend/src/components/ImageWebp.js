import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const getWebpCompatibilityInfo = () => JSON.parse(localStorage.getItem('thisBrowserWebpCompatibilty'));
const saveWebpCompatibilityInfo = info => localStorage.setItem('thisBrowserWebpCompatibilty', JSON.stringify(info));

let webpCompatibilityInfo = getWebpCompatibilityInfo();

const webpCompatibilityTest = () => {
  const webpTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  };

  const webpTestImagesKeys = Object.keys(webpTestImages);
  let nCompatible = 0;
  webpCompatibilityInfo = { NONE: true };

  webpTestImagesKeys.forEach((type) => {
    const xqImg = new Image();
    xqImg.onload = () => {
      webpCompatibilityInfo[type] = (xqImg.width > 0) && (xqImg.height > 0);

      if (webpCompatibilityInfo[type]) {
        webpCompatibilityInfo.NONE = false;
        nCompatible += 1;
        if (nCompatible === webpTestImagesKeys.length) webpCompatibilityInfo.ALL = true;
      }

      saveWebpCompatibilityInfo(webpCompatibilityInfo);
    };

    xqImg.onerror = () => {
      webpCompatibilityInfo[type] = false;
      saveWebpCompatibilityInfo(webpCompatibilityInfo);
    };

    xqImg.src = `data:image/webp;base64,${webpTestImages[type]}`;
  });
};

const activateWebpCompatibility = () => {
  if (!getWebpCompatibilityInfo()) webpCompatibilityTest();
};

const ASSET_BASE = process.env.PUBLIC_URL || '';

const ICON_MAP = {
  siteLogo: `${ASSET_BASE}/assets/ArchiScaffoldinglogo.png`,
  companyLogo: `${ASSET_BASE}/assets/ArchiScaffoldinglogo.png`,

  emailIcon: `${ASSET_BASE}/assets/emailIcon.png`,
  whatsappIcon: `${ASSET_BASE}/assets/logos_whatsapp-icon.png`,
  localizationIcon: `${ASSET_BASE}/assets/localisationsicon.png`,

  facebookIcon: `${ASSET_BASE}/assets/iconoir_facebook.svg`,
  instagramIcon: `${ASSET_BASE}/assets/mdi_instagram.svg`,
  twitterIcon: `${ASSET_BASE}/assets/ri_twitter-x-fill.svg`,
  linkedinIcon: `${ASSET_BASE}/assets/basil_linkedin-outline.svg`,
  tiktokIcon: `${ASSET_BASE}/assets/ph_tiktok-logo.svg`,

  Facebook: `${ASSET_BASE}/assets/iconoir_facebook.svg`,
  Instagram: `${ASSET_BASE}/assets/mdi_instagram.svg`,
  X: `${ASSET_BASE}/assets/ri_twitter-x-fill.svg`,
  Twitter: `${ASSET_BASE}/assets/ri_twitter-x-fill.svg`,
  LinkedIn: `${ASSET_BASE}/assets/basil_linkedin-outline.svg`,
  TikTok: `${ASSET_BASE}/assets/ph_tiktok-logo.svg`,

  'Facebook Logo': `${ASSET_BASE}/assets/iconoir_facebook.svg`,
  'Instagram Logo': `${ASSET_BASE}/assets/mdi_instagram.svg`,
  'Twitter Logo': `${ASSET_BASE}/assets/ri_twitter-x-fill.svg`,
  'LinkedIn Logo': `${ASSET_BASE}/assets/basil_linkedin-outline.svg`,
  'TikTok Logo': `${ASSET_BASE}/assets/ph_tiktok-logo.svg`,

  country: `${ASSET_BASE}/assets/worldwide blue icon.png`,
  Country: `${ASSET_BASE}/assets/worldwide blue icon.png`,
  co: `${ASSET_BASE}/assets/worldwide blue icon.png`,

  language: `${ASSET_BASE}/assets/ic_outline-language.svg`,
  Language: `${ASSET_BASE}/assets/ic_outline-language.svg`,
  lan: `${ASSET_BASE}/assets/ic_outline-language.svg`,
};

const isExternal = (v) => /^https?:\/\//i.test(v || '');
const isData = (v) => /^data:/i.test(v || '');

const normalizeToPublicUrl = (raw) => {
  if (!raw) return '';

  let v = String(raw).trim();
  if (!v) return '';

  if (ICON_MAP[v]) v = ICON_MAP[v];

  if (isExternal(v) || isData(v)) return v;

  if (v.startsWith('Image') && !v.includes('/')) v = v.replace(/^Image+/, '');

  if (v.startsWith('assets/')) v = `/${v}`;
  if (!v.startsWith('/') && !v.includes('/')) v = `/assets/${v}`;
  if (!v.startsWith('/')) v = `/${v}`;

  const base = process.env.PUBLIC_URL || '';
  if (base && v.startsWith(base + '/')) return v;
  return `${base}${v}`;
};

const nextFallbackSrc = (current) => {
  if (!current) return '';
  if (current.endsWith('.svg')) return current.replace(/\.svg$/i, '.png');
  if (current.endsWith('.png')) return current.replace(/\.png$/i, '.webp');
  if (current.endsWith('.jpg')) return current.replace(/\.jpg$/i, '.webp');
  if (current.endsWith('.jpeg')) return current.replace(/\.jpeg$/i, '.webp');
  return '';
};

class ImageWebp extends PureComponent {
  actualSrc = null;
  fallbackSrc = null;

  componentDidMount = () => {
    if (this.actualSrc !== transparentImage) return;
    if (!webpCompatibilityInfo) webpCompatibilityTest();
    setTimeout(() => this.forceUpdate(), 0);
  };

  onLoad = (e) => {
    const { onLoad } = this.props;
    if (onLoad && e.target.src !== transparentImage) onLoad(e);
  };

  onMouseMove = (e) => {
    const { onMouseMove } = this.props;
    if (onMouseMove && e.target.src !== transparentImage) onMouseMove(e);
  };

  onMouseLeave = (e) => {
    const { onMouseLeave } = this.props;
    if (onMouseLeave && e.target.src !== transparentImage) onMouseLeave(e);
  };

  onError = (e) => {
    const next = nextFallbackSrc(e.currentTarget.src);
    if (next && e.currentTarget.src !== next) {
      e.currentTarget.src = next;
      return;
    }
    e.currentTarget.src = transparentImage;
  };

  render() {
    const {
      src,
      srcWebp,
      className,
      style,
      width,
      height,
      alt,
      loading,
      ...rest
    } = this.props;
    ;

    const normalizedSrc = normalizeToPublicUrl(src);
    const normalizedWebp = srcWebp ? normalizeToPublicUrl(srcWebp) : null;

    this.actualSrc = normalizedSrc;

    if (normalizedWebp) {
      if (!webpCompatibilityInfo) {
        this.actualSrc = transparentImage;
      } else {
        const { ALL, NONE, lossless, alpha, lossy, animation } = webpCompatibilityInfo;

        if (ALL) {
          this.actualSrc = normalizedWebp;
        } else if (!NONE) {
          if (normalizedWebp.endsWith('.alpha.webp')) {
            if (alpha) this.actualSrc = normalizedWebp;
          } else if (normalizedWebp.endsWith('.lossless.webp')) {
            if (lossless) this.actualSrc = normalizedWebp;
          } else if (normalizedWebp.endsWith('.animation.webp')) {
            if (animation) this.actualSrc = normalizedWebp;
          } else if (lossy) {
            this.actualSrc = normalizedWebp;
          }
        }
      }
    }

    return (
      <img
        src={this.actualSrc || transparentImage}
        className={className}
        style={style}
        onLoad={this.onLoad}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        onError={this.onError}
        alt={alt}
        width={width}
        height={height}
        loading={loading || "lazy"}
        {...rest}
      />
    );
  }
}

ImageWebp.propTypes = {
  src: PropTypes.string.isRequired,
  srcWebp: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoad: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  alt: PropTypes.string,
};

ImageWebp.defaultProps = {
  srcWebp: null,
  className: null,
  style: null,
  width: null,
  height: null,
  onLoad: null,
  onMouseMove: null,
  onMouseLeave: null,
  alt: '',
};

export default ImageWebp;
export { getWebpCompatibilityInfo, activateWebpCompatibility };
