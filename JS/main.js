const form = $('#price-form');

let formData = form.serializeJSON();
console.log(formData);

showHideBlocks();


// Изменили данные о форме
form.on('keyup change paste', 'input, select, textarea ', function() {

	// Заново получили обновленные данные из формы
	formData = form.serializeJSON();
	console.log(formData);


	// Скрыли/Показали блоки на основе действий пользователя
	showHideBlocks();
	formData = form.serializeJSON();
	console.log(formData);

	// Обновляем цену на странице
	updatePrice(calculatePrice());


});

function showHideBlocks(){
	if (formData.type == 'site') {
		$('[data-name="pages"]').show();
		$('[data-name="landing"]').hide();
		$('[name="sections"]').val('0');
	}
	else {
		$('[data-name="pages"]').hide();
		$('[data-name="landing"]').show();
		$('[data-name="pages"] input').val('0');

	}

	if ( formData.mobile == 'on' ) {
		$('[data-name="mobile"]').show()
	}
	else {
		$('[data-name="mobile"]').hide()
		$('[name="mobile-number"]')[0].checked = true;
		$('[name="mobile-number"]')[1].checked = false;
		$('[name="mobile-number"]')[2].checked = false;
	}
}

function calculatePrice() {
	// Рассчитываем цену
	let totalPrice = 0;
	totalPrice = 
			formData['pages-unique'] * 4000 + 
			formData['pages-general'] * 2500 +
			formData['sections'] * 2000 +
			formData['carousel'] * 1200 +
			formData['modals'] * 900 +
			formData['forms'] * 1500;
	console.log(totalPrice);


	// Мобильный мультипликатор
	let multiplicatorMobile = 1;
	if (formData['mobile-number'] == 2) {
		multiplicatorMobile = 1.3
	} 
	else if (formData['mobile-number'] == 3) {
		multiplicatorMobile = 1.5
	}

	// PixelPerfect мультипликатор
	let mPixelPerfect =1;
	if (formData['pixelPerfect'] == 'on') {
		mPixelPerfect = 1.2
	}

	// Retina ready мультипликатор
	let mRetinaReady =1;
	if (formData['retinaReady'] == 'on') {
		mRetinaReady = 1.2
	}

	// googlePageSpeed мультипликатор
	let mgooglePageSpeed =1;
	if (formData['googlePageSpeed'] == 'on') {
		mgooglePageSpeed = 1.2
	}

	// Urgent Order мультипликатор
	let mUrgentOrder =1;
	if (formData['urgentOrder'] == 'on') {
		mUrgentOrder = 1.5
	}

	totalPrice = 
			totalPrice * multiplicatorMobile * 
			mPixelPerfect * mRetinaReady * 
			mgooglePageSpeed * mUrgentOrder;

	console.log('totalPrice: ', totalPrice);

	return totalPrice;
}

function updatePrice (price) {
	$('#total-price').text(price)
}