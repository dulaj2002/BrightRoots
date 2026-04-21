from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    role = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    specialization = db.Column(db.String(200))
    experience_years = db.Column(db.Integer)
    bio = db.Column(db.Text)
    questions_asked = db.relationship('Question', foreign_keys='Question.parent_id', backref='parent', lazy=True)
    questions_answered = db.relationship('Question', foreign_keys='Question.consultant_id', backref='consultant', lazy=True)
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'full_name': self.full_name,
            'phone': self.phone,
            'role': self.role,
            'status': self.status,
            'specialization': self.specialization,
            'experience_years': self.experience_years,
            'bio': self.bio,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    consultant_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(200), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50))
    answer_text = db.Column(db.Text)
    answered_at = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='pending')
    priority = db.Column(db.String(20), default='normal')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    def to_dict(self):
        return {
            'id': self.id,
            'parent_id': self.parent_id,
            'parent_name': self.parent.full_name if self.parent else None,
            'parent_email': self.parent.email if self.parent else None,
            'consultant_id': self.consultant_id,
            'consultant_name': self.consultant.full_name if self.consultant else None,
            'title': self.title,
            'question_text': self.question_text,
            'category': self.category,
            'answer_text': self.answer_text,
            'answered_at': self.answered_at.isoformat() if self.answered_at else None,
            'status': self.status,
            'priority': self.priority,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    consultant_id = db.Column(db.Integer)
    parent_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    child_age = db.Column(db.String(50), nullable=False)
    concern = db.Column(db.Text, nullable=False)
    preferred_date = db.Column(db.String(50), nullable=False)
    preferred_time = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'consultant_id': self.consultant_id,
            'parent_name': self.parent_name,
            'email': self.email,
            'phone': self.phone,
            'child_age': self.child_age,
            'concern': self.concern,
            'preferred_date': self.preferred_date,
            'preferred_time': self.preferred_time,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }