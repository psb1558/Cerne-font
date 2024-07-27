$(document).ready(function(){

	var modtext = "Britain, an island in the Atlantic, formerly called Albion, \
	 lies to the north-west, facing, though at a considerable distance, the \
	 coasts of Germany, France, and Spain, which form the greatest part of \
	 Europe. It extends 800 miles in length towards the north, and is 200 miles \
	 in breadth, except where several promontories extend further in breadth, by \
	 which its compass is made to be 4,875 miles. To the south lies Belgic Gaul. \
	 To its nearest shore there is an easy passage from the city of Rutubi \
	 Portus, by the English now corrupted into Reptacaestir. The distance from \
	 here across the sea to Gessoriacum, the nearest shore in the territory of \
	 the Morini, is fifty miles, or as some writers say, 450 furlongs. On the \
	 other side of the island, where it opens upon the boundless ocean, it has \
	 the islands called Orcades.";

    var latintext = "Brittania Oceani insula. cui quondam Albion nomen \
		 fuit. int̄ septen­trionē & occidentem locata est. Germaniae. \
		 Galliae. Hispaniae. maximis Europae partibꝫ multo int̄uallo aduersa. \
		 Q̄: ꝑ miliapassuum .dccc. in Boream longa. latitudinis \
		 habet milia .cc. exceptis dumtaxat ꝓlixioribus diuersor̄ ꝓmontorior̄ \
		 tractibꝫ. quibꝫ efficitur ut circuitus eius quadragies octies .lxxv. \
		 milia conpleat. Habet a meridie Galliam Belgicam. cuius proximum litus \
		 transmeantibus aperit ciuitas, q̄: dicitur Rutubi portus, a gente \
		 Anglor̄ nc̄ corrupte Reptacaestir uocata, interposito mari a Gessoriaco \
		 Morynor̄ gentis litore ꝓximo, traiectu milium .l. siue ut quidā \
		 scripsere, stadior̄ .cccl. A tergo autem, unde Oceano infinito patet, \
		 Orcadas Insulas habet.";

    var oldenglishtext = "Breton is garsecges ealond, þæt wæs iu geara Albion \
		haten: is geseted betwyh norðdæle and westdæle, Germanie ⁊ Gallie ⁊ \
		Hispanie þam mæstum dælum Europe myccle fæce ongegen. Þæt is norð ehta \
		hund mila lang, ⁊ tu hund mila brad. Hit hafað fram suðdæle þa mægþe \
		ongean, þe mon hateþ Gallia Bellica. Hit is welig þis ealond on wæstmum ⁊ \
		on treowum misenlicra cynna; ⁊ hit is gescræpe on læswe sceapa ⁊ neata; ⁊ \
		onsumum stowum wingeardas growaþ. Swylce eac þeos eorþe is berende \
		missenlicra fugla ⁊ sæwihta, ⁊ fiscumwyllum wæterum ⁊ wyllgespryngum. ⁊ \
		her beoþ oft fangene seolas ⁊ hronas and mereswyn; ⁊ her beoþ oft numene \
		missenlicra cynna weolcscylle ⁊ muscule, ⁊ on þam beoð oft gemette þa \
		betstan meregrotan ælces hiwes.";

	var usercolor = "#000000";

	// Clear the menus and boxes (in case the page is being reloaded) and
	// display the default (modern English) text.

//	var fstring = "\"ss08\" on, \"dlig\" on";
  var fstring = "";
//	$("#textbox").css("font-feature-settings", fstring).text(modtext);
	$("#textbox").text(modtext);
	$( "input[type='checkbox']" ).prop("checked", false);

	function selectElement(id, valueToSelect) {
    		let element = document.getElementById(id);
    		element.value = valueToSelect;
	}

	selectElement("languages","ModEnglish");
	selectElement("fontsizes","3em");

	// The "languages" dropdown menu selects a text and also
	// sets the "lang" attribute for the text box.

	$("#languages").change(function() {

		var l = "en";
		var t = modtext;
		var whitespace = "normal";
		var currentfstring = fstring;

		switch ( $("#languages option:selected").attr("value") ) {
			case "ModEnglish":
				// $( "input[type='checkbox']" ).not("#ss08, #dlig").prop("checked", false);
				// $("#ss08, #dlig").prop("checked",true).change();
				break;
			case "OldEnglish":
				// lang code is ang, but we use en to trigger English thorn and eth.
				t = oldenglishtext;
				// $( "input[type='checkbox']" ).prop("checked", false).first().change();
				break;
			case "Latin":
				l = "la"
				t = latintext;
				// $( "input[type='checkbox']" ).not("#hist").prop("checked", false);
				// $("#hist").prop("checked",true).change();
				break;
		}

		$("#textbox").attr("lang",l)
			.css({"white-space": whitespace})
			.text(t);

	});

	$("#fontsizes").change(function() {
		var sz = $("#fontsizes option:selected").attr("value");
		$("#textbox").css({"font-size": sz});
	});

	// Adds one tag/value pair to the feature string, adding punctuation
	// as needed.

	function featureString (s, tag, v) {
		var ss = s;
		if (ss.length > 0)
			ss += ", ";
		ss += '"' + tag + '" ' + v;
		return ss;
	}

	// Cycle through all the checkboxes, building the feature string. This is necessary
	// because in CSS all features besides the ones you set explicitly are set to their
	// default values. So we specify everything we want every time a box is checked or
	// unchecked.

	$("#colorinput").change(function(){
		usercolor = $("#colorinput").val()
		$("#textbox").css("color", usercolor)
	})

	$(".check").change(function() {

		fstring = "";
		showcolor = false

		$("input").each(function() {
			var tag = $(this).attr("id");
			if ($( this ).is(":checked")) {
				if ( tag === "morefeat" ) {
					$(".hid").css("display", "inline");
				}
				else if ( tag.length == 5 ) {
					var basetag = tag.substring(0,4);
					var tagindex = tag.substring(4);
					fstring = featureString(fstring, basetag, tagindex);
				}
				else {
					if (tag == "ss06") {
						showcolor = true
					}
					fstring = featureString(fstring, tag, "on");
				}
			}
			else if ( tag === "morefeat" ) {
				$(".hid").css("display", "none");
			}
		});

		if (showcolor) {
			$(".colorpicker").css("display", "inline")
			$("#textbox").css("color", usercolor)
		}
		else {
			$(".colorpicker").css("display", "none")
		}

		if (fstring.length == 0)
			fstring = "normal";

		$("#textbox").css("font-feature-settings", fstring);

	});
	});
