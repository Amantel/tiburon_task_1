$(document).ready(function () {

    function echo_error(text) {
        $("#response").html("");
        $("#response").append('<div class="alert alert-warning alert-dismissible" role="alert">  <button type="button" class="close" data-dismiss="alert" aria-label="Закрыть"><span aria-hidden="true">&times;</span></button>  <strong>Внимание!</strong> '+text+'</div>');
    }


    $("form.my_form").on("submit",  function (e) {

        e.preventDefault();
        e.stopPropagation();
        var data = {};
        var gender_radios = $("[type=radio][name=gender_radio]:checked");
        var cell_checkbox = $("[type=checkbox][name=cell_name\\[\\]]:checked");
        var error = false;
        var gender_error, cell_error = false;
        if (gender_radios.length > 0) {
            data.gender = gender_radios[0].value;
        } else {
            error = true;
            gender_error = true;
        }

        if (cell_checkbox.length > 0) {
            var cells = [];

            $.each(cell_checkbox, function (key, val) {
                cells.push(val.value);
            });
            data.cells = cells;

        } else {
            error = true;
            cell_error = true;
        }
        
        if (!error) {
            //save to Chache and show results

        } else {
      
            if (gender_error && cell_error) {
                echo_error("Пожалуйста, заполните всю форму.");
                return false;
            }
            if (gender_error) {
                echo_error("Пожалуйста, заполните всю информацию о вашем поле.");
                return false;
            }
            if (cell_error) {
                echo_error("Пожалуйста, заполните всю информацию о ваших телефонах.");
                return false;
            }

            
            return false;
        }

        
        $.post("/handle_form", data, function (result) {
            console.log(result);
            var cells_male = {};
            cells_male['Apple']=0;
            cells_male['Samsung']=0;
            cells_male['LG']=0;
            cells_male['HTC']=0;
            cells_male['Nokia']=0;
            cells_male['Other']=0;
            var cells_female = {};
            cells_female['Apple'] = 0;
            cells_female['Samsung'] = 0;
            cells_female['LG'] = 0;
            cells_female['HTC'] = 0;
            cells_female['Nokia'] = 0;
            cells_female['Other'] = 0;

            var male_total_answers = 0;
            var female_total_answers = 0;


            $.each(result, function (key, val) {
                
                
                if(val.gender=="male")
                {
                    $.each(val.cells, function (key1, val1) {
                        male_total_answers++;
                        cells_male[val1]++;
                    });
                }
                if (val.gender == "female") {
                    $.each(val.cells, function (key1, val1) {
                        female_total_answers++;
                        cells_female[val1]++;
                    });
                }
            });
            console.log(cells_male);
            console.log(cells_female);
            console.log(male_total_answers);
            console.log(female_total_answers);
            var result_string = "";

            
            result_string = "<h3>Процент обладателей каждой марки телефона среди мужчин: </h3>";
            $.each(cells_male, function (key, val) {
                var percent = 0;
                if (val)
                    percent = Math.round(val * 100 / male_total_answers);
                result_string += "<b>" + key + "</b>: " + percent + "% <br/>";
            });
            result_string += "<h3>Процент обладателей каждой марки телефона среди женщин: </h3>";
            $.each(cells_female, function (key, val) {

                var percent = 0;
                if (val)
                    percent = Math.round(val * 100 / female_total_answers);
                result_string += "<b>" + key + "</b>: " + percent + "% <br/>";
            });


            $("#response").html(result_string);
        });

 


    });


});