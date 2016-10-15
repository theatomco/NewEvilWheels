<?php
	header('Content-Type: application/json');
	$dir = @$_GET['location'];
	$getWidth = @$_GET['getWidth'];

	// /scanDir.php?location=data/eventsPhotos/veloproryv2016/

	$var = {
		"response": [
			{
				// ...
			},
			{
				// ...
			}
		]
	};

	$responseLength = $var.reponse.length;

	for(key = 0; key <= $responseLength; key++) {
		// ...
	}

	get($var.response[key].src_xxbig);
	get($var.response[key].width);

	$location = 'data/events/photos/'.$dir.'/';

	if($dir != "") {
		$files = scandir($location, 1);
		$settings = array(".", "..");

		$files = array_diff($files, $settings);

		shuffle($files);

		$class = array("item", "item medium", "item large");

		echo '['."\n";
		for($i = 0; $i <= count($files)-1; $i++) {
			$randClass = array_rand($class, 2);
			$photoSettings = getimagesize($location.$files[$i]);
			echo "\t".'{'."\n";
				echo "\t\t".'"src": "/'.$location.$files[$i].'",'."\n";
				echo "\t\t".'"class": "'.$class[$randClass[0]].'",'."\n";
				echo "\t\t".'"width": "'.$photoSettings[0].'",'."\n";
				echo "\t\t".'"height": "'.$photoSettings[1].'"'."\n";

				// if($class[$randClass[0]] == "item medium") {
				// 	$pwidth = 370;
				// }
				// else {
				// 	$pwidth = 120;
				// }

				// $maxwidth += $pwidth;
				// $maxwidth = $maxwidth/6;
			if($i == count($files)-1) {
				echo "\t".'}'."\n";
			}
			else {
				echo "\t".'},'."\n";
			}
		}
		echo ']'."\n";
	}
	elseif($getWidth != "") {
		$location = 'data/events/photos/'.$getWidth.'/';
		$maxwidth = 0;

		$files = scandir($location, 1);
		$settings = array(".", "..");

		$files = array_diff($files, $settings);

		shuffle($files);

		$class = array("item", "item medium", "item large");

		echo '{'."\n";
		for($i = 0; $i <= count($files)-1; $i++) {
			$randClass = array_rand($class, 2);
			$photoSettings = getimagesize($location.$files[$i]);
			if($class[$randClass[0]] == "item medium") {
				$pwidth = 245;
			}
			else {
				$pwidth = 120;
			}
			$maxwidth += $pwidth;
		}
		echo "\t".'"maxwidth": '.($maxwidth/5)."\n";
		echo '}'."\n";
	}
?>
