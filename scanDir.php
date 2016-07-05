<?php
	header('Content-Type: application/json');
	$location = $_GET['location'];

	if($location != "") {
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
			if($i == count($files)-1) {
				echo "\t".'}'."\n";
			}
			else {
				echo "\t".'},'."\n";
			}
		}
		echo ']'."\n";
	}
?>
