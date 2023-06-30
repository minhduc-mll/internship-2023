<template>
  <div class="footer">
    <div class="above-footer">
      <div class="logo">
        <img src="../../assets/img/site-logo-white.svg" />
        <span>Pulvinar aenean dignissim porttitor sed risus urna, pretium quis non id.</span>
        <div class="contact">
          <i class="bi bi-instagram"></i>
          <i class="bi bi-facebook"></i>
          <i class="bi bi-twitter"></i>
        </div>
      </div>
      <div class="infor">
        <span class="title">Information</span>
        <div class="title-items">
          <span>About me</span>
          <span>My story</span>
          <span>Awards & achievement</span>
          <span>Contact</span>
        </div>
      </div>
      <div class="discover">
        <span class="title">Discover</span>
        <div class="title-items">
          <span>Dresses</span>
          <span>Bottoms</span>
          <span>Footwear</span>
          <span>Accessories</span>
        </div>
      </div>
      <div class="locateUs">
        <span class="title">Locate Us</span>
        <div class="title-items">
          <span>123 Demo Blvd, Miami, FL 4567,</span>
          <span>United States</span>
          <span>+1 123-456-7890</span>
          <span>mail@example.com</span>
        </div>
      </div>
    </div>
    <div class="below-footer">
      <div class="below-footer-section-1">
        <span>© 2023 Fashion Designer. Powered by Fashion Designer</span>
      </div>
      <div class="below-footer-section-2">
        <img src="../../assets/img/fashion-designer-cc-visa-icon.svg" />
        <img src="../../assets/img/fashion-designer-cc-mastercard-icon.svg" />
        <img src="../../assets/img/fashion-designer-cc-discover-icon.svg" />
        <img src="../../assets/img/fashion-designer-cc-apple-pay-icon.svg" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/scss/modules";
.footer {
  width: 1349px;
  background-color: #26222f;
  display: block;
  & .above-footer {
    padding-top: 80px;
    padding-bottom: 48px;
    padding-left: 40px;
    padding-right: 40px;
    display: flex;
    column-gap: 50px;
    margin-left: 35.5px;
    margin-right: 35.5px;
    width: 1269px;

    & .logo {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      width: 262.5px;
      gap: 15px;
      flex: 1;

      & span {
        color: #d9d9d9;
        font-family: "Montserrat", sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 25.6px;
      }
      & .contact {
        display: flex;
        flex-wrap: wrap;
        margin-top: 5px;
        text-align: center;
        width: 100%;
        & i {
          color: white;
          margin-right: 24px;
        }
      }
    }
    & .infor {
      width: 262.5px;
      display: block;
      flex: 1;
      & .title {
        color: white;
        font-size: 20px;
        font-weight: 600;
        font-family: "Fahkwang", sans-serif;
      }
      & .title-items {
        display: flex;
        align-items: flex-start;
        justify-content: left;
        flex-direction: column;
        color: white;
        font-family: "Montserrat", sans-serif;
        font-size: 14px;
        font-weight: 300;
        line-height: 25.6px;
        margin-top: 30px;
      }
    }
    & .discover {
      width: 262.5px;
      display: block;
      flex: 1;
      & .title {
        color: white;
        font-size: 20px;
        font-weight: 600;
        font-family: "Fahkwang", sans-serif;
      }
      & .title-items {
        display: flex;
        align-items: flex-start;
        justify-content: left;
        flex-direction: column;
        color: white;
        font-family: "Montserrat", sans-serif;
        font-size: 14px;
        font-weight: 300;
        line-height: 25.6px;
        margin-top: 30px;
      }
    }
    & .locateUs {
      width: 262.5px;
      display: block;
      flex: 1;
      & .title {
        color: white;
        font-size: 20px;
        font-weight: 600;
        font-family: "Fahkwang", sans-serif;
      }
      & .title-items {
        display: flex;
        align-items: flex-start;
        justify-content: left;
        flex-direction: column;
        color: white;
        font-family: "Montserrat", sans-serif;
        font-size: 14px;
        font-weight: 300;
        line-height: 25.6px;
        margin-top: 30px;
      }
    }
  }
  & .below-footer {
    padding-top: 20px;
    padding-bottom: 20px;
    border-style: solid;
    border-top-width: 1px;
    border-width: 1px;
    border-top-color: #4c455f;
    width: 1349px;
    padding-left: 74.5px;
    padding-right: 74.5px;
    display: flex;
    justify-content: space-between;
    & .below-footer-section-1 {
      & span {
        color: #d9d9d9;
        text-align: left;
        font-size: 13px;
        font-family: "Montserrat", sans-serif;
        font-weight: 300;
      }
    }
    & .below-footer-section-2 {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
