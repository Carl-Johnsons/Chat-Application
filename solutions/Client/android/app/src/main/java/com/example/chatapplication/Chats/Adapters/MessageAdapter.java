package com.example.chatapplication.Chats.Adapters;


import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.chatapplication.Models.File;
import com.example.chatapplication.utils.DateLibs;
import com.example.chatapplication.Models.Message;
import com.example.chatapplication.R;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MessageAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private static final int VIEW_TYPE_SENT = 1;
    private static final int VIEW_TYPE_RECEIVED = 2;

    private Context context;
    private List<Message> messages;
    public static Map<String, String> userIdAvtUrlMap = new HashMap<String, String>();
    public static Map<String, String> userIdUserName = new HashMap<String, String>();


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
            if(message.attachedFilesURL != null && !message.attachedFilesURL.equals("[]")){
                Gson gson = new Gson();
                Type listType = new TypeToken<List<File>>() {}.getType();
                List<File> fileList = gson.fromJson(message.attachedFilesURL, listType);

                messageImage.setVisibility(View.VISIBLE);
                Glide.with(messageImage.getContext())
                        .load(fileList.get(0).getUrl())
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
                senderUsername.setText(getUserName(message.getSenderId()));
            }else {
                senderUsername.setVisibility(View.GONE);
            }

            if(message.attachedFilesURL != null && !message.attachedFilesURL.equals("[]")){
                Gson gson = new Gson();
                Type listType = new TypeToken<List<File>>() {}.getType();
                List<File> fileList = gson.fromJson(message.attachedFilesURL, listType);

                messageImage.setVisibility(View.VISIBLE);

                Glide.with(messageImage.getContext())
                        .load(fileList.get(0).getUrl())
                        .override(messageImage.getMaxWidth(), messageImage.getMaxHeight())
                        .fitCenter()
                        .into(messageImage);
            }else{
                messageImage.setVisibility(View.GONE);
            }
        }

        public String getUserAvatarURL(String userId){
            return userIdAvtUrlMap.get(userId);
        }

        public String getUserName(String userId){
            return userIdUserName.get(userId);
        }
    }
}
