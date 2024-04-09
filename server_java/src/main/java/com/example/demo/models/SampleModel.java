package com.example.demo.models;

import java.sql.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;



class Thumbnail {
    private String path;
    private String publicId;

    // Constructors, getters, and setters
    // Constructors
    public Thumbnail() {
        // Default constructor
    }

    public Thumbnail(String path, String publicId) {
        this.path = path;
        this.publicId = publicId;
    }

    // Getters and setters
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }
}


public class SampleModel {
    @Id
    private String id;
    private String name;
    private String size;
    private String color;
    private String email = "x123@gmail.com"; // Default value
    private Thumbnail thumbnail;
    private String category;
    private String occupation;
    private String occupationIs; // It's not clear from the original schema if it should have a default value or not
    private String description;
    private String status = "active"; // Default value
    private boolean deleted = false; // Default value
    @CreatedDate
    private Date createdAt;
    
    @LastModifiedDate
    private Date updatedAt;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Thumbnail getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(Thumbnail thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getOccupationIs() {
        return occupationIs;
    }

    public void setOccupationIs(String occupationIs) {
        this.occupationIs = occupationIs;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }



    @Override
    public String toString() {
        return "Sample{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", size='" + size + '\'' +
                ", color='" + color + '\'' +
                ", email='" + email + '\'' +
                ", thumbnail=" + thumbnail +
                ", category='" + category + '\'' +
                ", occupation='" + occupation + '\'' +
                ", occupationIs='" + occupationIs + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", deleted=" + deleted +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
