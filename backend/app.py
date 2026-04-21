from flask import Flask, jsonify, request, session
from flask_cors import CORS
import pandas as pd
import os
from datetime import datetime, timedelta
from functools import wraps
import jwt
from models import db, User, Question, Booking
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///parenting_consultation.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, supports_credentials=True)
db.init_app(app)
with app.app_context():
    db.create_all()
    admin = User.query.filter_by(email='admin@parentcare.com').first()
    if not admin:
        admin = User(
            email='admin@parentcare.com',
            full_name='Admin User',
            role='admin',
            status='active'
        )
        admin.set_password('admin123')
        db.session.add(admin)
        db.session.commit()
        print("Default admin user created: admin@parentcare.com / admin123")
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'success': False, 'error': 'Token is missing'}), 401
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({'success': False, 'error': 'User not found'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'success': False, 'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'success': False, 'error': 'Invalid token'}), 401
        return f(current_user, *args, **kwargs)
    return decorated
def role_required(*roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(current_user, *args, **kwargs):
            if current_user.role not in roles:
                return jsonify({'success': False, 'error': 'Unauthorized access'}), 403
            return f(current_user, *args, **kwargs)
        return decorated_function
    return decorator
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    required_fields = ['email', 'password', 'full_name', 'role']
    if not all(field in data for field in required_fields):
        return jsonify({'success': False, 'error': 'Missing required fields'}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'error': 'Email already registered'}), 400
    user = User(
        email=data['email'],
        full_name=data['full_name'],
        phone=data.get('phone'),
        role=data['role'],
        status='active' if data['role'] == 'parent' else 'pending'
    )
    user.set_password(data['password'])
    if data['role'] == 'consultant':
        user.specialization = data.get('specialization')
        user.experience_years = data.get('experience_years')
        user.bio = data.get('bio')
    db.session.add(user)
    db.session.commit()
    token = jwt.encode({
        'user_id': user.id,
        'role': user.role,
        'exp': datetime.utcnow() + timedelta(days=7)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({
        'success': True,
        'message': 'Registration successful',
        'token': token,
        'user': user.to_dict()
    }), 201
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data.get('email') or not data.get('password'):
        return jsonify({'success': False, 'error': 'Email and password required'}), 400
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'success': False, 'error': 'Invalid email or password'}), 401
    if user.status != 'active':
        return jsonify({'success': False, 'error': f'Account is {user.status}. Please contact admin.'}), 403
    token = jwt.encode({
        'user_id': user.id,
        'role': user.role,
        'exp': datetime.utcnow() + timedelta(days=7)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({
        'success': True,
        'message': 'Login successful',
        'token': token,
        'user': user.to_dict()
    })
@app.route('/api/auth/me', methods=['GET'])
@token_required
def get_current_user(current_user):
    return jsonify({
        'success': True,
        'user': current_user.to_dict()
    })
@app.route('/api/questions', methods=['POST'])
@token_required
@role_required('parent')
def create_question(current_user):
    data = request.get_json()
    if not data.get('title') or not data.get('question_text'):
        return jsonify({'success': False, 'error': 'Title and question text required'}), 400
    question = Question(
        parent_id=current_user.id,
        title=data['title'],
        question_text=data['question_text'],
        category=data.get('category', 'General'),
        priority=data.get('priority', 'normal')
    )
    db.session.add(question)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Question submitted successfully',
        'question': question.to_dict()
    }), 201
@app.route('/api/questions/my-questions', methods=['GET'])
@token_required
@role_required('parent')
def get_my_questions(current_user):
    questions = Question.query.filter_by(parent_id=current_user.id).order_by(Question.created_at.desc()).all()
    return jsonify({
        'success': True,
        'data': [q.to_dict() for q in questions],
        'count': len(questions)
    })
@app.route('/api/questions/pending', methods=['GET'])
@token_required
@role_required('consultant', 'admin')
def get_pending_questions(current_user):
    questions = Question.query.filter_by(status='pending').order_by(Question.created_at.desc()).all()
    return jsonify({
        'success': True,
        'data': [q.to_dict() for q in questions],
        'count': len(questions)
    })
@app.route('/api/questions/all', methods=['GET'])
@token_required
@role_required('consultant', 'admin')
def get_all_questions(current_user):
    status_filter = request.args.get('status', 'all')
    if status_filter == 'all':
        questions = Question.query.order_by(Question.created_at.desc()).all()
    else:
        questions = Question.query.filter_by(status=status_filter).order_by(Question.created_at.desc()).all()
    return jsonify({
        'success': True,
        'data': [q.to_dict() for q in questions],
        'count': len(questions)
    })
@app.route('/api/questions/<int:question_id>/answer', methods=['POST'])
@token_required
@role_required('consultant')
def answer_question(current_user, question_id):
    question = Question.query.get(question_id)
    if not question:
        return jsonify({'success': False, 'error': 'Question not found'}), 404
    if question.status == 'answered':
        return jsonify({'success': False, 'error': 'Question already answered'}), 400
    data = request.get_json()
    if not data.get('answer_text'):
        return jsonify({'success': False, 'error': 'Answer text required'}), 400
    question.answer_text = data['answer_text']
    question.consultant_id = current_user.id
    question.answered_at = datetime.utcnow()
    question.status = 'answered'
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Answer submitted successfully',
        'question': question.to_dict()
    })
@app.route('/api/questions/<int:question_id>', methods=['GET'])
@token_required
def get_question(current_user, question_id):
    question = Question.query.get(question_id)
    if not question:
        return jsonify({'success': False, 'error': 'Question not found'}), 404
    if current_user.role == 'parent' and question.parent_id != current_user.id:
        return jsonify({'success': False, 'error': 'Unauthorized'}), 403
    return jsonify({
        'success': True,
        'question': question.to_dict()
    })
@app.route('/api/questions/<int:question_id>', methods=['PUT'])
@token_required
@role_required('parent')
def update_question(current_user, question_id):
    question = Question.query.get(question_id)
    if not question:
        return jsonify({'success': False, 'error': 'Question not found'}), 404
    if question.parent_id != current_user.id:
        return jsonify({'success': False, 'error': 'Unauthorized - you can only edit your own questions'}), 403
    if question.status == 'answered':
        return jsonify({'success': False, 'error': 'Cannot edit answered questions'}), 400
    data = request.get_json()
    if 'title' in data:
        question.title = data['title']
    if 'question_text' in data:
        question.question_text = data['question_text']
    if 'category' in data:
        question.category = data['category']
    if 'priority' in data:
        question.priority = data['priority']
    question.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Question updated successfully',
        'question': question.to_dict()
    })
@app.route('/api/questions/<int:question_id>', methods=['DELETE'])
@token_required
@role_required('parent')
def delete_question_by_owner(current_user, question_id):
    question = Question.query.get(question_id)
    if not question:
        return jsonify({'success': False, 'error': 'Question not found'}), 404
    if question.parent_id != current_user.id:
        return jsonify({'success': False, 'error': 'Unauthorized - you can only delete your own questions'}), 403
    db.session.delete(question)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Question deleted successfully'
    })
@app.route('/api/questions/<int:question_id>/answer', methods=['PUT'])
@token_required
@role_required('consultant')
def update_answer(current_user, question_id):
    question = Question.query.get(question_id)
    if not question:
        return jsonify({'success': False, 'error': 'Question not found'}), 404
    if question.status != 'answered':
        return jsonify({'success': False, 'error': 'Question has not been answered yet'}), 400
    if question.consultant_id != current_user.id:
        return jsonify({'success': False, 'error': 'Unauthorized - you can only edit your own answers'}), 403
    data = request.get_json()
    if not data.get('answer_text'):
        return jsonify({'success': False, 'error': 'Answer text required'}), 400
    question.answer_text = data['answer_text']
    question.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Answer updated successfully',
        'question': question.to_dict()
    })
@app.route('/api/admin/users', methods=['GET'])
@token_required
@role_required('admin')
def get_all_users(current_user):
    role_filter = request.args.get('role', 'all')
    if role_filter == 'all':
        users = User.query.all()
    else:
        users = User.query.filter_by(role=role_filter).all()
    return jsonify({
        'success': True,
        'data': [u.to_dict() for u in users],
        'count': len(users)
    })
@app.route('/api/admin/users/<int:user_id>/status', methods=['PUT'])
@token_required
@role_required('admin')
def update_user_status(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'error': 'User not found'}), 404
    data = request.get_json()
    if not data.get('status'):
        return jsonify({'success': False, 'error': 'Status required'}), 400
    user.status = data['status']
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'User status updated successfully',
        'user': user.to_dict()
    })
@app.route('/api/admin/users/<int:user_id>', methods=['DELETE'])
@token_required
@role_required('admin')
def delete_user(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'error': 'User not found'}), 404
    if user.role == 'admin':
        return jsonify({'success': False, 'error': 'Cannot delete admin user'}), 400
    db.session.delete(user)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'User deleted successfully'
    })
@app.route('/api/admin/questions/<int:question_id>', methods=['DELETE'])
@token_required
@role_required('admin')
def delete_question(current_user, question_id):
    question = Question.query.get(question_id)
    if not question:
        return jsonify({'success': False, 'error': 'Question not found'}), 404
    db.session.delete(question)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Question deleted successfully'
    })
@app.route('/api/admin/stats', methods=['GET'])
@token_required
@role_required('admin')
def get_admin_stats(current_user):
    total_parents = User.query.filter_by(role='parent').count()
    total_consultants = User.query.filter_by(role='consultant').count()
    total_questions = Question.query.count()
    pending_questions = Question.query.filter_by(status='pending').count()
    answered_questions = Question.query.filter_by(status='answered').count()
    return jsonify({
        'success': True,
        'stats': {
            'total_parents': total_parents,
            'total_consultants': total_consultants,
            'active_consultants': User.query.filter_by(role='consultant', status='active').count(),
            'pending_consultants': User.query.filter_by(role='consultant', status='pending').count(),
            'total_questions': total_questions,
            'pending_questions': pending_questions,
            'answered_questions': answered_questions
        }
    })
def load_csv_data():
    csv_folder = os.path.join(os.path.dirname(__file__), '..', 'SampleQuestion')
    csv_files = {
        'general': 'General - Parenting Q&A Ages 0-5.csv',
        'health': 'Health, Hygiene, Habits - Parenting Q&A_ Health, Hygiene, Habits.csv',
        'discipline': 'Discipline & School Readiness - Parenting Q&A_ Discipline & School Readiness.csv',
        'development': 'Social & Cognitive Development - next.csv',
        'nutrition': 'Nutrition - Parenting Q&A Ages 0-5.csv',
        'sleep': 'Sleep - Parenting Q&A Ages 0-5.csv',
        'language': 'Language Development - Parenting Q&A Ages 0-5.csv',
        'behavior': 'Behavior Management - Parenting Q&A Ages 0-5.csv'
    }
    all_faqs = []
    for category, filename in csv_files.items():
        filepath = os.path.join(csv_folder, filename)
        try:
            df = pd.read_csv(filepath)
            category_map = {
                'general': 'General',
                'health': 'Health',
                'discipline': 'Discipline',
                'development': 'Development',
                'nutrition': 'Nutrition',
                'sleep': 'Sleep',
                'language': 'Language',
                'behavior': 'Behavior'
            }
            for _, row in df.iterrows():
                faq = {
                    'id': len(all_faqs) + 1,
                    'question': row['Question (English)'],
                    'questionSi': row['Question (Sinhala)'],
                    'answer': row['Answer (English)'],
                    'answerSi': row['Answer (Sinhala)'],
                    'category': category_map.get(category, 'General')
                }
                all_faqs.append(faq)
        except Exception as e:
            print(f"Error loading {filename}: {str(e)}")
    return all_faqs
FAQs = load_csv_data()
@app.route('/api/faqs', methods=['GET'])
def get_faqs():
    return jsonify({
        'success': True,
        'data': FAQs,
        'count': len(FAQs)
    })
@app.route('/api/faqs/search', methods=['GET'])
def search_faqs():
    query = request.args.get('q', '').lower()
    language = request.args.get('lang', 'en')
    if not query:
        return jsonify({'success': True, 'data': FAQs, 'count': len(FAQs)})
    filtered = []
    for faq in FAQs:
        if language == 'si':
            if query in faq['questionSi'].lower() or query in faq['answerSi'].lower():
                filtered.append(faq)
        else:
            if query in faq['question'].lower() or query in faq['answer'].lower():
                filtered.append(faq)
    return jsonify({
        'success': True,
        'data': filtered,
        'count': len(filtered),
        'query': query
    })
@app.route('/api/faqs/category/<category>', methods=['GET'])
def get_faqs_by_category(category):
    filtered = [faq for faq in FAQs if faq['category'].lower() == category.lower()]
    return jsonify({
        'success': True,
        'data': filtered,
        'count': len(filtered),
        'category': category
    })
FORUM_DISCUSSIONS = [
    {
        'id': 1,
        'title': 'Tips for establishing a bedtime routine',
        'author': 'Nimalika P.',
        'category': '1-2 years',
        'timeAgo': '2 hours ago',
        'preview': 'My 18-month-old fights sleep every night. What bedtime routines have worked for you?',
        'replies': 24,
        'likes': 18
    },
    {
        'id': 2,
        'title': 'Introducing solid foods - need advice',
        'author': 'Chamari S.',
        'category': '6-12 months',
        'timeAgo': '5 hours ago',
        'preview': 'Starting solids next week. Any recommendations for first foods?',
        'replies': 31,
        'likes': 22
    },
    {
        'id': 3,
        'title': 'Dealing with separation anxiety',
        'author': 'Thilini R.',
        'category': '0-6 months',
        'timeAgo': '1 day ago',
        'preview': 'My 5-month-old cries when I leave the room. Is this normal?',
        'replies': 15,
        'likes': 12
    }
]
@app.route('/api/forum/discussions', methods=['GET'])
def get_forum_discussions():
    category = request.args.get('category', 'all')
    if category == 'all':
        filtered = FORUM_DISCUSSIONS
    else:
        filtered = [d for d in FORUM_DISCUSSIONS if d['category'].lower() == category.lower()]
    return jsonify({
        'success': True,
        'data': filtered,
        'count': len(filtered)
    })
@app.route('/api/forum/discussions/<int:discussion_id>', methods=['GET'])
def get_discussion(discussion_id):
    discussion = next((d for d in FORUM_DISCUSSIONS if d['id'] == discussion_id), None)
    if discussion:
        return jsonify({'success': True, 'data': discussion})
    return jsonify({'success': False, 'error': 'Discussion not found'}), 404
ARTICLES = [
    {
        'id': 1,
        'title': 'Early Brain Development: The First 1000 Days',
        'category': 'Development',
        'readTime': '5 min read',
        'image': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
        'excerpt': 'Understanding the critical window of brain development in infants and toddlers.',
        'author': 'Dr. Priya Jayasinghe',
        'publishedDate': '2026-02-15'
    },
    {
        'id': 2,
        'title': 'Building Language Skills: Tips for Ages 0-3',
        'category': 'Language',
        'readTime': '4 min read',
        'image': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
        'excerpt': 'Practical strategies to enhance your child\'s language development.',
        'author': 'Ms. Nisha Fernando',
        'publishedDate': '2026-02-20'
    },
    {
        'id': 3,
        'title': 'Managing Toddler Behavior: A Gentle Approach',
        'category': 'Behavior',
        'readTime': '6 min read',
        'image': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=800&q=80',
        'excerpt': 'Positive discipline techniques for children aged 1-3 years.',
        'author': 'Dr. Amal Perera',
        'publishedDate': '2026-02-25'
    }
]
@app.route('/api/articles', methods=['GET'])
def get_articles():
    category = request.args.get('category', 'all')
    if category == 'all':
        filtered = ARTICLES
    else:
        filtered = [a for a in ARTICLES if a['category'].lower() == category.lower()]
    return jsonify({
        'success': True,
        'data': filtered,
        'count': len(filtered)
    })
@app.route('/api/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    article = next((a for a in ARTICLES if a['id'] == article_id), None)
    if article:
        return jsonify({'success': True, 'data': article})
    return jsonify({'success': False, 'error': 'Article not found'}), 404
CONSULTANTS = [
    {
        'id': 1,
        'name': 'Dr. Priya Jayasinghe',
        'specialization': 'Child Psychologist',
        'experience': '15 years',
        'image': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        'available': True,
        'languages': ['English', 'Sinhala'],
        'rating': 4.9,
        'consultationFee': 'Rs. 5000'
    },
    {
        'id': 2,
        'name': 'Dr. Amal Perera',
        'specialization': 'Pediatrician',
        'experience': '12 years',
        'image': 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80',
        'available': True,
        'languages': ['English', 'Sinhala', 'Tamil'],
        'rating': 4.8,
        'consultationFee': 'Rs. 4500'
    },
    {
        'id': 3,
        'name': 'Ms. Nisha Fernando',
        'specialization': 'Child Development Specialist',
        'experience': '10 years',
        'image': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        'available': False,
        'languages': ['English', 'Sinhala'],
        'rating': 4.7,
        'consultationFee': 'Rs. 4000'
    },
    {
        'id': 4,
        'name': 'Dr. Rohan Silva',
        'specialization': 'Speech Therapist',
        'experience': '8 years',
        'image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        'available': True,
        'languages': ['English', 'Sinhala'],
        'rating': 4.6,
        'consultationFee': 'Rs. 3500'
    }
]
@app.route('/api/consultants', methods=['GET'])
def get_consultants():
    available_only = request.args.get('available', 'false').lower() == 'true'
    if available_only:
        filtered = [c for c in CONSULTANTS if c['available']]
    else:
        filtered = CONSULTANTS
    return jsonify({
        'success': True,
        'data': filtered,
        'count': len(filtered)
    })
@app.route('/api/consultants/<int:consultant_id>', methods=['GET'])
def get_consultant(consultant_id):
    consultant = next((c for c in CONSULTANTS if c['id'] == consultant_id), None)
    if consultant:
        return jsonify({'success': True, 'data': consultant})
    return jsonify({'success': False, 'error': 'Consultant not found'}), 404
@app.route('/api/consultations/book', methods=['POST'])
def book_consultation():
    data = request.get_json()
    required_fields = ['name', 'email', 'phone', 'consultationType', 'preferredDate', 'childAge']
    for field in required_fields:
        if field not in data:
            return jsonify({
                'success': False,
                'error': f'Missing required field: {field}'
            }), 400
    booking = {
        'id': 1001,
        'bookingDate': datetime.now().isoformat(),
        'status': 'pending',
        **data
    }
    return jsonify({
        'success': True,
        'message': 'Consultation booked successfully!',
        'data': booking
    }), 201
@app.route('/api/learning/categories', methods=['GET'])
def get_learning_categories():
    categories = ['shapes', 'colors', 'animals', 'numbers', 'letters']
    return jsonify({
        'success': True,
        'data': categories
    })
@app.route('/api/tracker/milestones', methods=['GET'])
def get_milestones():
    milestones = [
        {'age': '2 months', 'title': 'Smiles at people', 'category': 'social'},
        {'age': '4 months', 'title': 'Holds head steady', 'category': 'physical'},
        {'age': '6 months', 'title': 'Sits without support', 'category': 'physical'},
        {'age': '9 months', 'title': 'Responds to own name', 'category': 'cognitive'},
        {'age': '12 months', 'title': 'Says first words', 'category': 'language'},
    ]
    return jsonify({
        'success': True,
        'data': milestones
    })
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'success': True,
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })
@app.route('/', methods=['GET'])
def root():
    return jsonify({
        'message': 'BrightRoots API v1.0.0',
        'endpoints': {
            'faqs': '/api/faqs',
            'search': '/api/faqs/search?q=query',
            'forum': '/api/forum/discussions',
            'articles': '/api/articles',
            'consultants': '/api/consultants',
            'health': '/api/health'
        }
    })
@app.errorhandler(404)
def not_found(error):
    return jsonify({'success': False, 'error': 'Endpoint not found'}), 404
@app.errorhandler(500)
def internal_error(error):
    return jsonify({'success': False, 'error': 'Internal server error'}), 500
if __name__ == '__main__':
    print("=" * 50)
    print("🚀 BrightRoots Backend API Starting...")
    print("=" * 50)
    print(f"📊 Loaded {len(FAQs)} FAQs from CSV files")
    print(f"📝 API running at: http://localhost:5000")
    print(f"🔗 Frontend CORS enabled for: http://localhost:3000")
    print("=" * 50)
    app.run(debug=True, host='0.0.0.0', port=5000)