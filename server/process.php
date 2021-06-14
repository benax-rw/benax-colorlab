<?php
    if($_POST){
        include_once "model-php/ColorManager.php";
        $colorObj = new ColorManager();
        $handle = fopen("exec.py", "w");
        fwrite($handle, "from light_color_controller import * \n\n".$colorObj->changeColor($_POST["color"]."\n"));
        fclose($handle);
        shell_exec("sudo python exec.py");
    }
?>
