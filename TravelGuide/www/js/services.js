angular.module('starter.services', [])

.factory('Places', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var places = [{
    id: 0,
    name: 'Al-Fourqaan mosque',
    details: 'The Al-Fourqaan mosque is a salafi Islamic mosque in which is part of Al-fourqaan Islamic Center in Eindhoven, Netherlands.\nThe mosque received media attention since 2005 for its jihadist imam Eisha Bersham from Bosnia. Intelligence service AIVD classified him as a threat to national security, and minister for integration and immigration Rita Verdonk responded by banning him from the country as an \'unwanted foreigner\'. Initially an Amsterdam court ruled that the imam could stay, but on 27 April 2007 the Council of State finally ruled Bersham would be banned from the Netherlands for the next ten years.\nTwo other men regularly prayed in the Al-Fourqaan mosque; Ahmed El Bakiouli and Khalid El Hassnoui. They were reportedly recruited by Algerian terrorist group Groupe Salafiste pour la Pr\u00e9dication et le Combat to fight in the holy war. They were both killed in Kashmir (India) where Muslims have been fighting a separatist war.\n\n',
    image: 'img/tu-e.jpg',
    pageid: 30900514
  }, {
    id: 1,
    name: 'Eindhoven University of Technology',
    details: 'The Eindhoven University of Technology (Dutch: Technische Universiteit Eindhoven, abbr. TU/e) is a university of technology located in Eindhoven, Netherlands. Its motto is Mens agitat molem (Mind moves matter). The university was the second of its kind in the Netherlands, only Delft University of Technology existed previously. Until mid-1980 it was known as the Technische Hogeschool Eindhoven (abbr. THE). In 2011 QS World University Rankings placed Eindhoven at 146th internationally, but 61st globally for Engineering & IT. Furthermore, in 2011 Academic Ranking of World Universities (ARWU) rankings, TU/e was placed at the 52-75 bucket internationally in Engineering/Technology and Computer Science (ENG) category and at 34th place internationally in the field of Computer Science. In 2003 a European Commission report ranked TU/e at third place among all European research universities (after Cambridge and Oxford and at equal rank with TU Munich), thus making it the highest ranked Technical University in Europe.',
    image: 'img/fourqaan-mosque.jpg',
    pageid: 9706
  }, {
    id: 2,
    name: 'De Karpendonkse Hoeve',
    details: 'De Karpendonkse Hoeve is a restaurant located in Eindhoven in the Netherlands. It is a fine dining restaurant that is awarded one Michelin star every year since 1979.\nGaultMillau awarded the restaurant 14.0 out of 20 points.\nHead chef is Peter Koehn. In 1980, Koehn took over from Peter Willems, who had earned the Michelin star in 1979.\nPresent owner is Ingrid van Eeghem. In 2004 she took over the ownership of her father Leo van Eeghem, who had founded the restaurant in 1973.\nVan Eeghen regularly invites other chefs to show off their cooking qualities. Guest chefs include Paula DaSilva, runner up of Hell\'s Kitchen (U.S. season 5) and the Japanese chef Katsumasa Kitajima, known for the Kaiseki Ryori cuisine.\nIn 2007, De Karpendonkse Hoeve celebrated their 30th Michelin star in a row.',
    image: 'img/karpendonkse-hoeve.jpg',
    pageid: 34462603
  }, {
    id: 3,
    name: 'Catharina Ziekenhuis',
    details: 'Catharina Ziekenhuis (English: Catharina Hospital), which is colloquially named \'t Katrien (the Katrien), is a teaching hospital in Eindhoven, Netherlands. The hospital was founded in 1843, and has been at its current location since 1973. It is one of two hospitals in the city of Eindhoven, the other is M\u00e1xima Medisch Centrum, and it is the biggest hospital in the larger Eindhoven region.',
    image: 'img/catharina.jpg',
    pageid: 43692232
  }, {
    id: 4,
    name: 'Effenaar',
    details: 'The Effenaar is a pop music venue in Eindhoven, Netherlands. It was founded in 1971 and has grown into one of the larger pop venues in the country.\nThe current Effenaar consists of two music halls. The large hall has an audience capacity of 1200, is intended for use by larger bands and acts and is considerably larger than the hall of the original Effenaar. The small hall has a capacity of 350 (which is smaller than the old Effenaar) and is used for smaller and/or regional bands.\nThe old Effenaar has hosted many large (national and international) acts throughout its existence, including The Ramones, The Cure, Joy Division, Sex Pistols, Red Hot Chili Peppers, R.E.M., Fugazi and Queens of the Stone Age.',
    image: 'img/effenaar.jpg',
    pageid: 28689036
  }];

  return {
    all: function() {
      return places;
    },
    remove: function(place) {
      places.splice(places.indexOf(place), 1);
    },
    get: function(placeId) {
      for (var i = 0; i < places.length; i++) {
        if (places[i].id === parseInt(placeId)) {
          return places[i];
        }
      }
      return null;
    }
  };
});
