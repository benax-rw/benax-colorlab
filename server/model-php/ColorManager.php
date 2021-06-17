<?php
class ColorManager{
    public function changeColor($color){
	if(trim($color) == "rainbow"){
            $func = "runChase()";
        }
        else{
            $GRB = explode(",",trim($color));
	    $G = $GRB[0];
            $R = $GRB[1];
            $B = $GRB[2];
	    $brightness = $GRB[3];

            $func = "changeColor($G,$R,$B, $brightness)";
        }
        return $func;
    }
}
?>
