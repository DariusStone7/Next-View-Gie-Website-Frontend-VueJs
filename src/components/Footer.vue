<script setup>
import { setting } from '@/states/states.js'

</script>

<template>
  <div class="footer justify-content-between">
    <div class="logo">
      <h1>Next-View GIE</h1>
      <div class="social-network p-3 justify-content-bettween">
        <a :href=" setting.facebook "><font-awesome-icon icon="fa-brands fa-facebook-f" size="lg" color="white" /></a>
        <a :href=" setting.twitter "><font-awesome-icon icon="fa-brands fa-twitter" size="lg" color="white" /></a>
        <a :href=" setting.linkedin "
          ><font-awesome-icon icon="fa-brands fa-linkedin-in" size="lg" color="white"
        /></a>
        <a :href=" setting.youtube "><font-awesome-icon icon="fa-brands fa-youtube" size="lg" color="white" /></a>
      </div>
    </div>
    <div class="menu">
      <h3>Menu</h3>
      <h4></h4>
      <li>
        <a href="/"> Accueil </a>
      </li>
      <li>
        <a href="/a-propos"> A propos </a>
      </li>
      <li>
        <a href="/contact"> Contact </a>
      </li>
    </div>
    <div class="services">
      <h3>Services</h3>
      <h4></h4>
      <li>
        <a href="service-technologie">Technologie</a>
      </li>
      <li>
        <a href="service-immobilier"> Immobilier </a>
      </li>
      <li>
        <a href="service-vehicule"> Véhicule </a>
      </li>
    </div>
    <div class="newsletter">
      <h3>Newsletter</h3>
      <h4></h4>
      <h5>Souscrire à notre newsletter</h5>
      <div class="form">
        <form action="" class="d-flex justify-content-center">
          <input type="email" name="email" class="form-control" placeholder="yourmail@mail.com" />
          <button type="submit" class="btn">
            <font-awesome-icon :icon="['fas', 'paper-plane']" color="white" size="2x" />
          </button>
        </form>
      </div>
    </div>
  </div>
  <div class="copyright">
    <p>Copyright © 2023 Next-View-GIE All rights reserved.</p>
  </div>
</template>

<style scoped>
.footer {
  padding: 50px 5% 20px 5%;
  background-color: #000;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
  text-align: center;
  display: flex;
}
.footer h1 {
  font-weight: bold;
}
.footer h3 {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
}
.footer li a {
  font-size: 16px;
  letter-spacing: 1px;
  color: #dad5d5;
  text-decoration: none;
}
.footer li a:hover {
  color: rgb(240, 149, 29);
}
.footer .logo .social-network {
  width: auto;
  text-align: center;
}
.footer .logo .social-network a {
  padding-right: 50px;
}
.footer .menu {
  text-align: center;
  width: 85px;
}
.footer .services {
  text-align: center;
  width: 90px;
}
.footer .newsletter {
  text-align: center;
  width: 280px;
}
.footer h4 {
  width: 80px;
  height: 3px;
  background: rgb(240, 149, 29);
  margin: 20px 0px 20px 5px;
}
.footer .menu li {
  list-style-type: none;
  width: 200px;
  height: 50px;
  text-align: left;
  padding: 10px 0px 10px 4px;
}
.footer .services li {
  list-style-type: none;
  width: 200px;
  height: 50px;
  text-align: left;
  padding: 10px 0px 10px 0px;
}
.footer .newsletter {
  text-align: left;
  padding: 5px 0px 10px 18px;
}
.footer .newsletter h5 {
  margin-top: 25px;
  font-size: 18px;
}
.footer .newsletter form {
  margin-top: 20px;
}
.footer .newsletter form input {
  width: 200px;
}

.copyright {
  width: 100%;
  height: 60px;
  margin: 0;
  text-align: center;
  background-color: #000;
  color: rgb(61, 60, 60);
  padding: 20px 0px 20px 0px;
  border-top: 1px solid #2c2b2b;
}

@media screen and (max-width: 950px) {
  .footer {
    background: #000;
  }
  .footer .newsletter form input {
    width: 150px;
  }
  .footer .logo .social-network a {
    padding-right: 20px;
  }
}
@media screen and (max-width: 850px) {
  .footer {
    display: block;
    text-align: center;
  }
  .footer h4 {
    margin: 10px 0px 10px 0px;
  }
  .footer .menu {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  .footer .services {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  .footer .newsletter {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  .footer .menu li {
    width: 100%;
    text-align: center;
  }
  .footer .services li {
    width: 100%;
    text-align: center;
  }
  .footer .newsletter {
    padding: 5px 0px 10px 0px;
  }
}
</style>