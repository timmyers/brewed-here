import { NextPage } from 'next';
import Layout from '../components/Layout';

const Home: NextPage = () => (
  <Layout>
    <header>
      <h1>Brewed Here</h1>
      <p>Find and track your visits to the 300+ breweries in Colorado.</p>
    </header>
    <hr />
    <section>
      <header>
        <h2>Download the Apps!</h2>
      </header>
      <aside>
        <a href="https://play.google.com/apps/testing/co.brewedhere.brewedhere" target="_blank"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" height="100"/></a>
        <h3>Android</h3>
        <p>In open beta testing now!</p>
      </aside>
      <aside>
        <img alt="Download on the App Store" src="/appstore.svg" height="70"/>
        <style jsx>{`
          img {
            opacity: .2;
            margin-top: 15px;
            margin-bottom: 15px;
            margin-left: 20px;
          }
        `}</style>
        <h3>iOS</h3>
        <p>Beta coming soon!</p>
      </aside>
    </section>
  </Layout>
);

export default Home;
