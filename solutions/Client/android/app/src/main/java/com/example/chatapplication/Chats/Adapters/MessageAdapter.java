package com.example.chatapplication.Chats.Adapters;


import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;
import com.example.chatapplication.Libs.DateLibs;
import com.example.chatapplication.Models.Message;
import com.example.chatapplication.R;

import java.util.List;

public class MessageAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private static final int VIEW_TYPE_SENT = 1;
    private static final int VIEW_TYPE_RECEIVED = 2;

    private Context context;
    private List<Message> messages;

    public MessageAdapter(Context context, List<Message> messages) {
        this.context = context;
        this.messages = messages;
    }

    @Override
    public int getItemViewType(int position) {
        Message message = messages.get(position);
        return message.isSender() ? VIEW_TYPE_SENT : VIEW_TYPE_RECEIVED;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        if (viewType == VIEW_TYPE_SENT) {
            View view = inflater.inflate(R.layout.component_message_sent, parent, false);
            return new SentMessageViewHolder(view);
        } else {
            View view = inflater.inflate(R.layout.component_message_receive, parent, false);
            return new ReceiveMessageViewHolder(view);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        Message message = messages.get(position);
        if (holder instanceof SentMessageViewHolder) {
            SentMessageViewHolder sentHolder = (SentMessageViewHolder) holder;
            sentHolder.bind(message);
        } else {
            ReceiveMessageViewHolder receiveHolder = (ReceiveMessageViewHolder) holder;
            receiveHolder.bind(message);
        }
    }

    @Override
    public int getItemCount() {
        return messages.size();
    }

    static class SentMessageViewHolder extends RecyclerView.ViewHolder {
        private TextView messageText;
        private TextView messageTime;
        private ImageView messageImage;


        public SentMessageViewHolder(@NonNull View itemView) {
            super(itemView);
            messageText = itemView.findViewById(R.id.message_text);
            messageTime = itemView.findViewById(R.id.message_time);
            messageImage = itemView.findViewById(R.id.message_image);
        }

        public void bind(Message message) {
            messageText.setText(message.getContent());
            messageTime.setText(DateLibs.FormatDate("hh:mm", message.getCreatedAt()));
            if(message.attachedFilesURL != null && !message.attachedFilesURL.equals("")){
                messageImage.setVisibility(View.VISIBLE);
                Glide.with(messageImage.getContext())
                        .load(message.getAttachedFilesURL())
                        .override(messageImage.getMaxWidth(), messageImage.getMaxHeight())
                        .fitCenter()
                        .into(messageImage);
            }else{
                messageImage.setVisibility(View.GONE);
            }
        }
    }

    static class ReceiveMessageViewHolder extends RecyclerView.ViewHolder {
        private TextView messageText;
        private TextView messageTime;
        private ImageView avatar;
        private TextView senderUsername;
        private ImageView messageImage;



        public ReceiveMessageViewHolder(@NonNull View itemView) {
            super(itemView);
            messageText = itemView.findViewById(R.id.message_text);
            messageTime = itemView.findViewById(R.id.message_time);
            avatar = itemView.findViewById(R.id.avatar);
            senderUsername = itemView.findViewById(R.id.senderUsername);
            messageImage = itemView.findViewById(R.id.message_image);
        }

        public void bind(Message message) {
            messageText.setText(message.getContent());
            messageTime.setText(DateLibs.FormatDate("hh:mm", message.getCreatedAt()));
            Glide.with(avatar.getContext()).load(getUserAvatarURL(message.getSenderId())).circleCrop().into(avatar);

            if(message.isShowUsername()){
                senderUsername.setText(getUsername(message.getSenderId()));
            }else {
                senderUsername.setVisibility(View.GONE);
            }

            if(message.attachedFilesURL != null && !message.attachedFilesURL.equals("")){
                messageImage.setVisibility(View.VISIBLE);

                Glide.with(messageImage.getContext())
                        .load(message.getAttachedFilesURL())
                        .override(messageImage.getMaxWidth(), messageImage.getMaxHeight())
                        .fitCenter()
                        .into(messageImage);
            }else{
                messageImage.setVisibility(View.GONE);
            }
        }
        public String getUserAvatarURL(String userId){
            return "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg";
        }
        public String getUsername(String userId){
            return "John Nathan";
        }
    }
}
