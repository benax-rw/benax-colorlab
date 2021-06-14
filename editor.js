
        
        var file_content = "&lt;link rel=&quot;stylesheet&quot; href=&quot;css/theme.css&quot;&gt;\n&lt;?php\n$path = $_GET[&quot;file&quot;];\n?&gt;\n\n&lt;div style=&quot;position: absolute; top: -320px; left: -62px;font-size: 18px; right: -62px; display: block; overflow: auto; height: 90vh&quot; id=&quot;editor&quot;&gt;&lt;?php \n\n    if (!file_exists($path)) {   \n\n        $lines = file(&#39;pages/default.txt&#39;);\n        foreach ($lines as $line){\n            echo htmlspecialchars($line);\n        }\n    }\n    else{\n        $lines = file($path);\n        foreach ($lines as $line){\n            echo htmlspecialchars($line);\n        }                    \n    }\n    ?&gt;&lt;/div&gt;\n\n&lt;script src=&quot;ace-builds/src-noconflict/ace.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;\n    &lt;script&gt;\n        \n        var editor = ace.edit(&quot;editor&quot;);\n        var code_type = &quot;php&quot;;\n        editor.setTheme(&quot;ace/theme/monokai&quot;);\n        editor.setOption(&quot;indentedSoftWrap&quot;, true);\n        editor.session.setMode(&quot;ace/mode/&quot;+code_type);\n        \n         window.onload = function() {\n          document.querySelector(&quot;.ace_text-input&quot;).focus();\n        } \n     \n        var request = false;\n        if (window.XMLHttpRequest) {\n            request = new XMLHttpRequest();\n        }\n        else if (window.ActiveXObject) {\n            request = new ActiveXObject(&#39;Microsoft.XMLHTTP&#39;);\n        }\n\n        function saveCode(){\n            var code = document.querySelector(&quot;.ace_layer.ace_text-layer&quot;).innerText;\n            var encoded_code = encodeURIComponent(code);\n        \n            var filepath = &quot;&lt;?php echo $path ?&gt;&quot;;\n            var feedback = document.getElementById(&quot;feedback&quot;);\n            feedback.style.opacity = 0.5;\n            feedback.style.backgroundImage = &quot;url(&#39;images/spinner-07.gif&#39;)&quot;;\n            \n            //console.log(filepath);\n            \n            if (request){\n                request.open(&quot;POST&quot;, &quot;instances/codeObj.php&quot;, true);\n                request.onreadystatechange = function() {\n                    if (request.readyState == 4 &amp;&amp; request.status == 200) {\n                        \n                        setTimeout(function(){\n                            feedback.style.transition = &quot;0.2s&quot;;\n                            feedback.style.opacity = 1; \n                            feedback.style.backgroundImage = &quot;url(&#39;images/checkmark-white.png&#39;)&quot;;\n                        }, 2000);\n                        \n                        if(request.responseText==&quot;Successfully saved!&quot;){\n                            feedback.style.transition = &quot;0.2s&quot;;\n                            feedback.style.opacity = 0.5;                        \n                            feedback.style.backgroundImage = &quot;url(&#39;images/checkmark-yellow.png&#39;)&quot;;\n                        }else{\n                            //alert(request.responseText);\n                            feedback.style.transition = &quot;0.2s&quot;;\n                            feedback.style.opacity = 0.5;                         \n                            feedback.style.backgroundImage = &quot;url(&#39;images/not.png&#39;)&quot;;                         \n                        }\n                    }\n                }\n                request.setRequestHeader(&quot;Content-type&quot;, &quot;application/x-www-form-urlencoded&quot;);\n                request.send(&quot;code=&quot;+encoded_code+&quot;&amp;codefilepath=&quot;+filepath+&quot;&amp;action=save_code&quot;);\n                \n            }\n        }\n    \n        \n    &lt;/script&gt;\n            \n \n";
        // Using jquery way of decoding the html content.
        // Tried to use '_' version of unescape method but it
        // did not decode encoded version of apostrophe (')
        // where the code is &#39;
        var htmlContent = $("<div/>").html(file_content).text();

        var fileName = "edit.php";
        var editAreaEl = "";
        var lastResizeTime = 0;
        var lastResizeRequestTime = 0;
        var NVData = {"editor_fontsize":"16","editor_nowrap":"1"};

        function load_EditArea(workingContent) {
            workingContent = workingContent;
            if(USE_LEGACY_EDITOR){
                showAceEditorElements(false);

                editAreaEl = 'legacy_codewindow';
                CODEWINDOW = DOM.get(editAreaEl);
                editAreaLoader.show(editAreaEl);
                loadLegacyEditor(editAreaEl, workingContent);
            } else {
                editAreaLoader.hide(editAreaEl);

                editAreaEl = 'codewindow';
                CODEWINDOW = DOM.get(editAreaEl);
                showAceEditorElements(true);
                loadAceEditor(editAreaEl, workingContent);
            }
        }

        function showAceEditorElements(show){
            if(show){
                $(".show-ace-editor").show();
            } else {
                $(".show-ace-editor").hide();
            }
        }

        function loadLegacyEditor(editAreaId, editContent){
            // Setting up the ids in js/edit_area_resizer.js file to
            // use it for resizing purposes.
            setElementIds(editAreaId);
            var EditArea_config = {
                id: editAreaEl,
                start_highlight: true,
                allow_resize: "both",
                allow_toggle: false,
                language: "en",
                toolbar: "search, go_to_line, |, undo, redo, |, select_font, |, syntax_selection, |, change_smooth_selection, highlight, reset_highlight, word_wrap, |, help",
                syntax: "php",
                word_wrap: true
            };
            editAreaLoader.setValue(editAreaId, editContent);

            editAreaLoader.init(EditArea_config);
            doResizeSoon();
        }

        function loadAceEditor(editAreaEl, editContent){
            ace_editor = ace.edit(editAreaEl);
            // The line below is added to disable a
            // warning message as required by ace editor
            // script.
            ace_editor.$blockScrolling = Infinity;
            ace_editor.focus();

            var editSession = ace.createEditSession(editContent);
            ace_editor.setSession(editSession);
            if(typeof(editSession) !== "undefined"){
                var defaultFontSize = parseInt(NVData.editor_fontsize, 10) || 13;
                // Load the modelist extension to identify the file
                // type of the given file and open the file in that
                // editor mode.
                var modelist = ace.require("ace/ext/modelist");
                var modeObj = modelist.getModeForPath(fileName);

                ace_editor.setOptions({
                    "fontSize": defaultFontSize,
                    "mode": modeObj.mode,
                    "theme": "ace/theme/chrome"
                });
                updateWordWrapInterface();

                // Fill mode list dropdown in the toolbar.
                var $modeEl = $('#ddlModes');
                fillModesDropdown($modeEl, modelist);
                $modeEl.val(modeObj.name);
                // Bind change event.
                $modeEl.change(function(){
                    var selectedMode = $modeEl.find( "option:selected" ).first().val();
                    ace_editor.getSession().setMode(modelist.modesByName[selectedMode].mode);
                });

                // Fill font size dropdown.
                var $fontEl = $('#ddlFontSizes');
                fillFontsDropdown($fontEl);
                $fontEl.val(defaultFontSize);
                // Bind change event.
                $fontEl.change(function(){
                    var selectedSize = parseInt($fontEl.find( "option:selected" ).first().val());
                    SetNvData("editor_fontsize", selectedSize);
                    ace_editor.setFontSize(selectedSize);
                });
            }
        }

        function fillFontsDropdown($el) {
            var arr = [10, 11, 12, 13, 14, 16, 18, 20, 24].map(function(size){
                return {val: size, text: size + "px"};
            });
            arr.forEach(function(val){
                $el.append($("<option>", val));
            });
        }

        function fillModesDropdown($el, modeList) {
            var arr = modeList.modes.map(function(oMode){
                return {val: oMode.name, text: oMode.caption};
            });
            arr.forEach(function(val){
                $el.append($("<option>", val));
            });
        }

        function toolbarActions(action){
            switch(action){
                case "search":
                ace_editor.execCommand("find");
                break;
                case "goto":
                ace_editor.execCommand("gotoline");
                break;
                case "undo":
                ace_editor.undo();
                break;
                case "redo":
                ace_editor.redo();
                break;
                case "linewrap":
                toggleWordWrap();
                break;
            }
        }

        function toggleWordWrap() {
            if (NVData.editor_nowrap) {
                SetNvData("editor_nowrap", 0);
            } else {
                SetNvData("editor_nowrap", 1);
            }
            updateWordWrapInterface();
        }

        function updateWordWrapInterface() {
            var btnEl = document.querySelector("#btnLineWrap");

            if (btnEl && NVData.editor_nowrap) {
                ace_editor.setOption("wrap", false);
                btnEl.classList.remove("active");
            } else {
                ace_editor.setOption("wrap", 80);
                btnEl.classList.add("active");
            }
            // Remove the focus button state for less UI confusion
            btnEl.blur();
        }

        /*
         * This function detects if the browser is in a mobile
         * environment.
         * Note: This is used to open the editor in legacy editor mode
         * until Ace editor comes with the fixes for issues described in
         * ZC-2558.
        */
        function detectmobile() {
         if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         ){
            return true;
          }
         else {
            return false;
          }
        }

        function toggle_EditArea(link) {
            var workingContent = "";
            if(USE_LEGACY_EDITOR){
                USE_LEGACY_EDITOR = false;
                // send working content to not loose working data
                // when user switches between two editors.
                workingContent = (editAreaLoader) ? editAreaLoader.getValue(editAreaEl) : "";
            } else {
                USE_LEGACY_EDITOR = true;
                // Reset the word wrap
                toggleWordWrap();
                // send working content to not loose working data
                // when user switches between two editors.
                workingContent = (ace_editor) ? ace_editor.getSession().getValue() : "";
            }
            toggleSwitchButtonAttr(link);
            load_EditArea(workingContent);
        }

        function toggleSwitchButtonAttr(btnEl) {
            var $switchButton = $(btnEl);
            if(USE_LEGACY_EDITOR){
                $switchButton.text("Use latest editor").prop("title", "Switch to latest editor.");
            } else {
                $switchButton.text("Use legacy editor").prop("title", "Switch to legacy editor.");
            }
        }

        var CODEWINDOW;
        var ace_editor;

        EVENT.throwErrors = true;

        YAHOO.util.Event.addListener(window, "load", function(){
            savedContent = htmlContent;
            if(detectmobile()){
                USE_LEGACY_EDITOR = true;
            }
            toggleSwitchButtonAttr(DOM.get("switch_editor_control"));
            load_EditArea(savedContent);
        });
        $(window).resize(function(e) {
            doResize();
        });
