var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;

var DMschema = new Schema({
	auditCode: {type: String, required: true},
	godiste: {type: Number, required: true},
	spol: {type: String, required: true},
	porodicna_anamneza: {type: Boolean, required: true},
	tipDM: {type: String, required: true},
	hospitalizacija: {type: Number, required: true},
	hba1c: {type: Boolean, required: true},
	ValHbA1C: {type: String},
	glukoza: {type: Boolean, required: true},
	ValGlukoza: {type: String},
	glukoza2: {type: Boolean, required: true},
	ValGlukoza2: {type: String},
	ttv: {type: Boolean, required: true},
	bmi: {type: Boolean, required: true}
});

module.exports = mongoose.model('DiabetesAudit', DMschema);