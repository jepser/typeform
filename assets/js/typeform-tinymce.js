tinymce.PluginManager.add('typeform_embed', function(editor) {

	editor.addButton('typeform_embed', {
		text: 'Add Typeform',
        icon: false,
        onclick: function() {
            // Open window
            editor.windowManager.open({
                title: 'Add embed form',
                body: [
                    {
                    	type: 'textbox', 
                    	name: 'tf_url', 
                    	label: 'Typeform Form URL'
                    },
                    {
                    	type: 'textbox',
                    	name: 'tf_width',
                    	label: 'Width'
                    },
                    {
                    	type: 'textbox',
                    	name: 'tf_height',
                    	label: 'Height'
                    }
                ],
                onsubmit: function(e) {
                    // Insert content when the window form is submitted
                    var shortcode = '[typeform_embed ';

                    shortcode += 'url="' + e.data.tf_url + '"';
                    if(e.data.tf_width){
                    	shortcode += ' width="' + e.data.tf_width + '"';
                    }
                    if(e.data.tf_height){
                    	shortcode += ' height="' + e.data.tf_height + '"';
                    }
                    shortcode += ']';
                    editor.insertContent(shortcode);
                }
            });
        }
	})
});