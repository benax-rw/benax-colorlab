<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="style.css">
<style>
.select-css {
    font-size: 20px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    max-width: 100%; 
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
}
.select-css::-ms-expand {
    display: none;
}
.select-css:hover {
    border-color: #888;
}
.select-css:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222; 
    outline: none;
}
.select-css option {
    font-weight:normal;
}

.button {
    background-color: #BBB;
    color: white;
    padding: 0.7em .8em 0.7em .8em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
	font-weight: 700;
    margin: 4px 2px;
    cursor: pointer;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
}

th,td{font-size: 20px; font-weight: 700;}
body {
  padding: 1rem;
}

.auto-btn{
    border: 1px solid #EEE; 
    padding: 20px; background: purple; 
    border-radius: 8px; 
    color: #FFF; 
    width: 100px; 
    font-size: 22px;
    cursor: pointer;
}

</style>


<h1>Benax | ColorLab</h1>
<p>
ColorLab teaches how light color mixing and light intensity work.<br>

</p>
<div style="100%">

	<span style="font-size: 22px;">Brightness:</span> 
	<select onChange="changeColor()" class="select-css" id="brightness">
		<option value="255">255</option>
		<option value="225">225</option>
		<option value="200">200</option>
		<option value="175">175</option>
		<option value="150">150</option>
		<option value="125">125</option>
		<option value="100">100</option>
		<option value="75">75</option>
		<option value="50">50</option>
		<option value="25">25</option>
		<option value="0">0</option>
	</select>
<hr>

<table>
	<tr>
	<th>
	<font color="green">Green</font>
	</th>

	<th>
	<font color="red">Red</font>
	</th>

	<th>
	<font color="blue">Blue</font>
	</th>

	<th>
	</th>

	</tr>
	<tr>

	<td>
	<select onChange="changeColor()" class="select-css" id="G">
		<option value="255">255</option>
		<option value="200">200</option>
		<option value="150">150</option>
		<option value="100">100</option>
		<option value="50">50</option>
		<option value="0">0</option>
	</select>
	</td>
	<td>
	<select onChange="changeColor()"  class="select-css" id="R">
		<option value="255">255</option>
		<option value="200">200</option>
		<option value="150">150</option>
		<option value="100">100</option>
		<option value="50">50</option>
		<option value="0">0</option>
	</select>
	</td>
	<td>
	<select onChange="changeColor()"  class="select-css" id="B">
		<option value="255">255</option>
		<option value="200">200</option>
		<option value="150">150</option>
		<option value="100">100</option>
		<option value="50">50</option>
		<option value="0">0</option>
	</select>
	</td>

	</tr>
	

	    
</table>

    <hr>
		
    <div class="auto-btn" onClick="runChase()">Automatic</div>

</div>

<script>
    var request = false;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    function changeColor(){
		var G = document.getElementById("G").value;
		var R = document.getElementById("R").value;
		var B = document.getElementById("B").value;
		var brightness = document.getElementById("brightness").value;
		var color = G+","+R+","+B+","+brightness;
		
        if(request){
            request.open('POST','server/process.php', true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send("color="+color);
        }         
                
    }
    
    function runChase(){	
        if(request){
            request.open('POST','server/process.php', true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send("color=rainbow");
        }         
                
    }    
</script>
