<div class="loader loader--style5">
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="30px"
    height="50px"
    viewBox="0 0 24 45"
    style="enable-background:new 0 0 50 50;"
    xml:space="preserve"
  >
    <rect x="0" y="0" width="5" height="20" fill="#333">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="10" y="0" width="5" height="20" fill="#333">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.2s"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="20" y="0" width="5" height="20" fill="#333">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.4s"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
</div>

<style lang="scss">
  .loader {
    width: 20%;
    display:flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    z-index: 9999;
  }

  svg path,
  svg rect {
    fill: var(--theme-colors-text);
  }
</style>
