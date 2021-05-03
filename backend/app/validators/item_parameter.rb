class ItemParameter < ActiveModel::EachValidator 
    def validates_each(record, attribute, value)
        if record.item_code_parameter.regex 
            unless 
        end
    end