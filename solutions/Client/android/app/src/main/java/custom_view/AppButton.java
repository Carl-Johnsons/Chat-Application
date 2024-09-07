package custom_view;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.widget.Button;

import androidx.annotation.ColorInt;
import androidx.appcompat.widget.AppCompatButton;
import androidx.core.content.ContextCompat;

import com.example.chatapplication.R;
import com.google.android.material.button.MaterialButton;

public class AppButton extends MaterialButton {
    public AppButton(Context context) {
        super(context);
        init(null);
    }

    public AppButton(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs);
    }

    public AppButton(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(attrs);
    }

    private void init(AttributeSet attrs) {
        if(attrs != null){
            TypedArray btnType = getContext().obtainStyledAttributes(attrs, R.styleable.AppButton);
            try{
                int type = btnType.getInt(R.styleable.AppButton_type, 0);
                //Primary button
                if(type == 0){
                    //setBackground(ContextCompat.getDrawable(this.getContext(), R.drawable.primary_button_colors));
                    setTextColor(getResources().getColor(R.color.white));
                }
                else if(type == 1){
                    //setBackground(ContextCompat.getDrawable(this.getContext(), R.drawable.secondary_button_colors));
                    setTextColor(getResources().getColor(R.color.black));

                }
            }finally {
                btnType.recycle();
            }
        }
    }
}
