$(function() {
	$("input,textarea").jqBootstrapValidation({
		preventSubmit: true,
		submitError: function($form, event, errors) {
			// additional error messages or events
		},
		submitSuccess: function($form, event) {
			event.preventDefault(); // prevent default submit behaviour
			var email = $("input#email").val(); // get email from FORM
			var ref = new Firebase("https://moveapp15.firebaseio.com/").child("landingpage_mails");
			ref.push(email, function (error) {
				if (!error) formSuccess();
				else		formError();
			});
		},
		filter: function() {
			return $(this).is(":visible");
		},
	});

	$("a[data-toggle=\"tab\"]").click(function(e) {
		e.preventDefault();
		$(this).tab("show");
	});
});

/*When clicking on Full hide fail/success boxes */
$('#success').focus(function () {
	$('#success').html('');
});

function formSuccess() {
	// Success message
	$('#success').html("<div class='alert alert-success'>");
	$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
		.append("</button>");
	$('#success > .alert-success')
		.append("<strong>Bienvenido al grupo! Gracias por suscribirte.</strong>");
	$('#success > .alert-success')
		.append('</div>');
	//clear all fields
	$('#contactForm').trigger("reset");
	$('#submit').attr("disabled", "disabled");
}

function formError() {
	// Fail message
	$('#success').html("<div class='alert alert-danger'>");
	$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
		.append("</button>");
	$('#success > .alert-danger').append("<strong>Lo sentimos, parece que ocurrio un error, intenta nuevamente.");
	$('#success > .alert-danger').append('</div>');
	//clear all fields
	$('#contactForm').trigger("reset");
}