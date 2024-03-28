function addRow() {
    var tbody = document.querySelector('#quotationTable tbody');
    var newRow = tbody.insertRow();
    const rowCount = tbody.rows.length;
    newRow.className = 'row-' + rowCount;
    newRow.innerHTML = `
<td><input class="sr-no" type="text" name="sr_no_1"></td>
<td colspan="2">
    <select class="product" onChange="calculateRowAmount(this)">
        <option value="1100">Kaju(W 180)</option>
        <option value="980">Kaju(W 210)</option>
        <option value="900">Kaju(W 240)</option>
        <option value="850">Kaju(W 320)</option>
        <option value="800">Kaju(W 400)</option>
        <option value="600">Kaju Motha Tukada</option>
        <option value="700">Kaju Mothi Pakali</option>
        <option value="650">Kaju Choti Pakali</option>
        <option value="550">Kaju Pakali Tukada</option>
        <option value="450">Kaju Kani</option>
        <option value="">Mango</option>
        <option value="">Other</option>
    </select>
</td>
<td><input class="units" type="text" name="units" value="" onChange="calculateRowAmount(this)"></td>
<td>
    <select class="qty-unit" onChange="calculateRowAmount(this)">
        <option value="1">1kg</option>
        <option value="0.5">500g</option>
        <option value="0.25">250g</option>
        <option value="0.25">Dozen</option>
    </select>
</td>
<td><input class="price" type="text" name="price"></td>
<td><input class="amount" type="text" name="amount" onChange="calculateTotal()"></td>
`;
    newRow.querySelectorAll('.sr-no').forEach(input => {
        input.addEventListener('change', generateSrNo(input, rowCount));
    });
}

function calculateTotal() {
    var totalAmount = 0;
    var totalPrice = 0;
    const rowPattern = /^row-\d+$/;
    document.querySelectorAll('#quotationTable #quotationBody tr').forEach(row => {
        if (rowPattern.test(row.className)) {
            var price = row.querySelector('.price').value || 0;
            var amount = row.querySelector('.amount').value || 0;
            totalAmount = totalAmount + parseInt(amount);
            totalPrice = totalPrice + parseInt(price);
        }
    });
    document.querySelectorAll('#quotationTable #finalAmountBody tr').forEach(row => {
        var sgst = row.querySelector('.sgst');
        var cgst = row.querySelector('.cgst');
        var finalAmount = row.querySelector('.total_amount');
        var totalDiscount = row.querySelector('.total_discount');


        sgstAmt = Math.round((2.5 / 100) * totalAmount.toFixed(2));
        cgstAmt = Math.round((2.5 / 100) * totalAmount.toFixed(0));
        finalAmt = parseFloat(sgstAmt) + parseFloat(cgstAmt) + parseInt(totalAmount);
        sgst.value = "Rs."+ sgstAmt;
        cgst.value = "Rs."+ cgstAmt;
        finalAmount.value = "Rs."+finalAmt;
        totalDiscount.value = "Rs."+Math.abs((totalPrice-totalAmount));
    });
}

function generateSrNo(selectElement, rowCount) {
    var row = selectElement.closest('tr')
    row.querySelector('.sr-no').value = rowCount - 6 + 1;
}

function calculateRowAmount(selectElement) {
    var row = selectElement.closest('tr');
    var productPrice = row.querySelector('.product').value || 0;
    var qty = row.querySelector('.units').value || 0;
    var unitValue = row.querySelector('.qty-unit').value || 0;
    var price = row.querySelector('.price');
    var rowTotal = (qty * productPrice) * unitValue;
    price.value = rowTotal.toFixed(2);
}

document.getElementById('datePicker').valueAsDate = new Date();
addRow();