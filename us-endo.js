function filterList() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('archiveInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("archiveList");
  li = ul.getElementsByClassName('tabItem');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h5")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
}
function showTab(identi) {
  clearTabs();
  var list_id = "item-" + identi;
  $('#' + list_id).fadeIn(500);
  $('#' + list_id).css('display', 'block');
  $('#' + list_id).addClass('active-block');
  var containerHeight = $('.active-block').height() + 200;
  console.log("Container Height: " + containerHeight);
  $('#svgContainer').hide();
  if( containerHeight > 800 ) {
    console.log('over 800');
    var containerHeight = containerHeight - 200;
    $('#practice-drill').css('height', containerHeight);
  } else {
    $('#practice-drill').css('height', containerHeight);
  }


}
function clearTabs() {
  $('#practice-drill').css('height', '0px');
  $('#svgContainer').css('display', 'block');
  $('.tabs.w-dyn-item').each(function() {
    $(this).css('display', 'none');
    if($(this).hasClass('active-block')) {
      $(this).removeClass('active-block');
    }
  });
}
function showMap(reg) {
  var reg = 'map-' + reg
  console.log(reg);
  $('.map').each(function() {
    if($(this).hasClass(reg)) {
      $(this).css('display', 'block');
    } else {
      $(this).css('display', 'none');
    }
  });
}
function setActive(reg) {
  var reg = "tab-" + reg;
  console.log(reg);
  $('.tablist').each(function() {
  if($(this).hasClass('current')) {
      $(this).removeClass('current');
    } else if($(this).hasClass(reg)) {
      $(this).addClass('current');
    } else {
      return;
    }
 });
}
function regionFilter(region) {
  var reg = region;
  clearTabs();
  // showMap(reg);
  setActive(reg);
  $('.newstab').each(function() {
    if(reg == 'all') {
      $(this).css('display', 'block');
    } else {
      $(this).css('display', 'block');
      if($(this).hasClass('item-' + reg)) {
        return;
      } else {
        $(this).css('display', 'none');
      }
    }
  });

  var els = document.querySelectorAll('.region-map');
  function resetMap() {
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove('active-map');
    }
  }

  if( reg !== 'all' ) {
    // Add
    resetMap();

    var mapRegion = region + '-int-map';
    var mapSelect = document.getElementById(mapRegion);
    mapSelect.classList.add("active-map");
  } else {
    resetMap();
  }

}
function mapSelect(param) {
  regionFilter(param);
  console.log(param);
}

$(document).ready(function() {
  $('.region-map').click(function() {
    var id = $(this).attr('id');
    var construct = id.replace('-int-map', '');
    console.log(construct);
    regionFilter(construct);
  });
});

function getQuery() {
  practice = getAllUrlParams().practice;
  console.log(practice);
  if(practice) {
    $(document).ready(function() {
      showTab(practice);
      const id = 'practice-drill';
      const yOffset = -40;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
      console.log(practice);
    });
  } else {
    return;
  }
}
getQuery();

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}