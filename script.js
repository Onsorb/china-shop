
class ChinaShop {
  constructor() {
      this.products = [];
      this.cart = [];
      this.wishlist = [];
      this.currentUser = null;
      this.init();
  }

  init() {
      this.initializeApp();
      this.loadProducts();
      this.setupEventListeners();
      this.setupIntersectionObserver();
  }

  initializeApp() {

      window.addEventListener('load', () => {
          setTimeout(() => {
              this.hideLoadingScreen();
              this.showScrollToTop();
          }, 1000);
      });


      window.addEventListener('scroll', () => {
          this.handleScroll();
      });
  }

  hideLoadingScreen() {
      const loadingScreen = document.getElementById('loadingScreen');
      if (loadingScreen) {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
              loadingScreen.remove();
          }, 500);
      }
  }

  handleScroll() {
      this.toggleHeaderShadow();
      this.showScrollToTop();
      this.animateOnScroll();
  }

  toggleHeaderShadow() {
      const header = document.getElementById('mainHeader');
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  }

  showScrollToTop() {
      const scrollBtn = document.getElementById('scrollToTop');
      if (window.scrollY > 300) {
          scrollBtn.classList.add('show');
      } else {
          scrollBtn.classList.remove('show');
      }
  }

  setupEventListeners() {
   
      document.getElementById('scrollToTop')?.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });

     
      document.getElementById('mobileMenuBtn')?.addEventListener('click', this.toggleMobileMenu);

      
      this.setupHeroSlider();

  
      this.setupSearch();


      this.setupCart();

    
      this.setupWishlist();

    
      this.setupProductFilters();


      this.setupCountdownTimer();

      this.setupNewsletter();

      
      this.setupFloatingChat();

   
      this.setupProductModal();

    
      this.setupCategoryClicks();
  }

  setupHeroSlider() {
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.dot');
      const prevBtn = document.getElementById('prevSlide');
      const nextBtn = document.getElementById('nextSlide');
      let currentSlide = 0;
      let slideInterval;

      const showSlide = (index) => {
          slides.forEach(slide => slide.classList.remove('active'));
          dots.forEach(dot => dot.classList.remove('active'));
          
          currentSlide = (index + slides.length) % slides.length;
          slides[currentSlide].classList.add('active');
          dots[currentSlide].classList.add('active');
      };

      const nextSlide = () => {
          showSlide(currentSlide + 1);
      };

      const prevSlide = () => {
          showSlide(currentSlide - 1);
      };

      const startSlider = () => {
          slideInterval = setInterval(nextSlide, 5000);
      };

      const stopSlider = () => {
          clearInterval(slideInterval);
      };

      // Event Listeners
      nextBtn?.addEventListener('click', () => {
          stopSlider();
          nextSlide();
          startSlider();
      });

      prevBtn?.addEventListener('click', () => {
          stopSlider();
          prevSlide();
          startSlider();
      });

      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              stopSlider();
              showSlide(index);
              startSlider();
          });
      });


      const slider = document.querySelector('.hero-slider');
      slider?.addEventListener('mouseenter', stopSlider);
      slider?.addEventListener('mouseleave', startSlider);

    
      startSlider();
  }

  setupSearch() {
      const searchInput = document.getElementById('searchInput');
      const searchBtn = document.getElementById('searchBtn');
      const suggestions = document.getElementById('searchSuggestions');

      const products = [
          'سرویس غذاخوری 12 نفره',
          'سرویس پذیرایی 6 نفره',
          'ست فنجان و نعلبکی',
          'لیوان شیشه ای لوکس',
          'بشقاب سرو لوکس',
          'سرویس چای خوری',
          'پارچ دکوراتیو',
          'شکرپاش کریستالی'
      ];

      searchInput?.addEventListener('input', (e) => {
          const value = e.target.value.toLowerCase();
          if (value.length > 1) {
              const filtered = products.filter(product => 
                  product.toLowerCase().includes(value)
              );
              this.showSearchSuggestions(filtered);
          } else {
              this.hideSearchSuggestions();
          }
      });

      searchBtn?.addEventListener('click', () => {
          this.performSearch(searchInput.value);
      });

      searchInput?.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              this.performSearch(searchInput.value);
          }
      });

     
      document.addEventListener('click', (e) => {
          if (!searchInput?.contains(e.target) && !suggestions?.contains(e.target)) {
              this.hideSearchSuggestions();
          }
      });
  }

  showSearchSuggestions(suggestionsList) {
      const suggestions = document.getElementById('searchSuggestions');
      if (!suggestions) return;

      suggestions.innerHTML = '';
      suggestionsList.forEach(item => {
          const div = document.createElement('div');
          div.className = 'suggestion-item';
          div.textContent = item;
          div.addEventListener('click', () => {
              document.getElementById('searchInput').value = item;
              this.performSearch(item);
              this.hideSearchSuggestions();
          });
          suggestions.appendChild(div);
      });
      suggestions.classList.add('show');
  }

  hideSearchSuggestions() {
      const suggestions = document.getElementById('searchSuggestions');
      suggestions?.classList.remove('show');
  }

  performSearch(query) {
      if (query.trim()) {
          alert(`جستجو برای: ${query}`);
        
          this.hideSearchSuggestions();
      }
  }

  setupCart() {
      const cartBtn = document.getElementById('cartBtn');
      const closeCart = document.getElementById('closeCart');
      const checkoutBtn = document.getElementById('checkoutBtn');

      cartBtn?.addEventListener('click', () => {
          this.openCart();
      });

      closeCart?.addEventListener('click', () => {
          this.closeCart();
      });

      checkoutBtn?.addEventListener('click', () => {
          this.checkout();
      });

  
      document.addEventListener('click', (e) => {
          const cartSidebar = document.getElementById('cartSidebar');
          if (!cartSidebar?.contains(e.target) && !cartBtn?.contains(e.target)) {
              this.closeCart();
          }
      });
  }

  openCart() {
      const cartSidebar = document.getElementById('cartSidebar');
      cartSidebar?.classList.add('active');
      this.updateCartDisplay();
  }

  closeCart() {
      const cartSidebar = document.getElementById('cartSidebar');
      cartSidebar?.classList.remove('active');
  }

  addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id);
      
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          this.cart.push({
              ...product,
              quantity: 1
          });
      }
      
      this.updateCartCount();
      this.showAddToCartAnimation();
      this.openCart();
  }

  removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.updateCartCount();
      this.updateCartDisplay();
  }

  updateCartQuantity(productId, change) {
      const item = this.cart.find(item => item.id === productId);
      if (item) {
          item.quantity += change;
          if (item.quantity <= 0) {
              this.removeFromCart(productId);
          } else {
              this.updateCartCount();
              this.updateCartDisplay();
          }
      }
  }

  updateCartCount() {
      const cartCount = document.querySelector('.cart-count');
      const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
      if (cartCount) {
          cartCount.textContent = totalItems;
      }
  }

  updateCartDisplay() {
      const cartItems = document.getElementById('cartItems');
      const cartEmpty = document.getElementById('cartEmpty');
      const totalPrice = document.getElementById('totalPrice');

      if (!cartItems || !cartEmpty) return;

      if (this.cart.length === 0) {
          cartItems.style.display = 'none';
          cartEmpty.style.display = 'block';
          totalPrice.textContent = '۰ تومان';
          return;
      }

      cartItems.style.display = 'block';
      cartEmpty.style.display = 'none';

      cartItems.innerHTML = '';
      let total = 0;

      this.cart.forEach(item => {
          total += item.price * item.quantity;
          
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
              <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-item-details">
                  <h4 class="cart-item-title">${item.name}</h4>
                  <p class="cart-item-price">${this.formatPrice(item.price)} تومان</p>
                  <div class="cart-item-controls">
                      <button class="quantity-btn decrease" onclick="chinaShop.updateCartQuantity(${item.id}, -1)">-</button>
                      <span class="cart-item-quantity">${item.quantity}</span>
                      <button class="quantity-btn increase" onclick="chinaShop.updateCartQuantity(${item.id}, 1)">+</button>
                      <button class="remove-item" onclick="chinaShop.removeFromCart(${item.id})">
                          <i class="fas fa-trash"></i>
                      </button>
                  </div>
              </div>
          `;
          cartItems.appendChild(cartItem);
      });

      totalPrice.textContent = `${this.formatPrice(total)} تومان`;
  }

  checkout() {
      if (this.cart.length === 0) {
          alert('سبد خرید شما خالی است!');
          return;
      }

      const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      alert(`در حال هدایت به صفحه پرداخت...\nمبلغ قابل پرداخت: ${this.formatPrice(total)} تومان`);

  }

  setupWishlist() {
      const wishlistBtn = document.getElementById('wishlistBtn');
      
      wishlistBtn?.addEventListener('click', () => {
          this.toggleWishlist();
      });
  }

  toggleWishlist() {
   
      alert('صفحه علاقه‌مندی‌ها');
  }

  toggleWishlistItem(product) {
      const existingIndex = this.wishlist.findIndex(item => item.id === product.id);
      
      if (existingIndex > -1) {
          this.wishlist.splice(existingIndex, 1);
      } else {
          this.wishlist.push(product);
      }
      
      this.updateWishlistCount();
  }

  updateWishlistCount() {
      const wishlistCount = document.querySelector('.wishlist-count');
      if (wishlistCount) {
          wishlistCount.textContent = this.wishlist.length;
      }
  }

  setupProductFilters() {
      const filterBtns = document.querySelectorAll('.filter-btn');
      
      filterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
  
              filterBtns.forEach(b => b.classList.remove('active'));
      
              btn.classList.add('active');
              
              const filter = btn.dataset.filter;
              this.filterProducts(filter);
          });
      });
  }

  filterProducts(filter) {
      const productsGrid = document.getElementById('productsGrid');
      if (!productsGrid) return;

      let filteredProducts = [...this.products];

      switch (filter) {
          case 'new':
              filteredProducts = filteredProducts.filter(p => p.isNew);
              break;
          case 'bestseller':
              filteredProducts = filteredProducts.filter(p => p.isBestseller);
              break;
          case 'discount':
              filteredProducts = filteredProducts.filter(p => p.discount);
              break;
      }

      this.renderProducts(filteredProducts);
  }

  setupCountdownTimer() {
      const updateTimer = () => {
          const now = new Date();
          const target = new Date(now);
          target.setDate(now.getDate() + 3); // 3 روز بعد
          
          const diff = target - now;
          
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          document.getElementById('days').textContent = days.toString().padStart(2, '0');
          document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
          document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
          document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      };

      updateTimer();
      setInterval(updateTimer, 1000);
  }

  setupNewsletter() {
      const newsletterForm = document.getElementById('newsletterForm');
      
      newsletterForm?.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = newsletterForm.querySelector('input[type="email"]').value;
          
          if (this.isValidEmail(email)) {
              this.subscribeToNewsletter(email);
              newsletterForm.reset();
          } else {
              alert('لطفاً یک ایمیل معتبر وارد کنید.');
          }
      });
  }

  isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  subscribeToNewsletter(email) {
      // در حالت واقعی اینجا درخواست به سرور ارسال می‌شود
      alert(`ایمیل ${email} با موفقیت در خبرنامه ثبت شد!`);
  }

  setupFloatingChat() {
      const chatBtn = document.getElementById('chatBtn');
      const chatOptions = document.getElementById('chatOptions');
      
      chatBtn?.addEventListener('click', () => {
          chatOptions.style.display = chatOptions.style.display === 'flex' ? 'none' : 'flex';
      });

    
      document.addEventListener('click', (e) => {
          if (!chatBtn?.contains(e.target) && !chatOptions?.contains(e.target)) {
              chatOptions.style.display = 'none';
          }
      });
  }

  setupProductModal() {
      const modal = document.getElementById('productModal');
      const closeModal = document.getElementById('closeModal');
      
      closeModal?.addEventListener('click', () => {
          this.closeProductModal();
      });

      modal?.addEventListener('click', (e) => {
          if (e.target === modal) {
              this.closeProductModal();
          }
      });
  }

  openProductModal(product) {
      const modal = document.getElementById('productModal');
      const modalName = document.getElementById('modalProductName');
      const modalContent = document.getElementById('modalProductContent');
      
      if (!modal || !modalName || !modalContent) return;

      modalName.textContent = product.name;
      modalContent.innerHTML = this.getProductModalContent(product);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
  }

  closeProductModal() {
      const modal = document.getElementById('productModal');
      modal?.classList.remove('active');
      document.body.style.overflow = 'auto';
  }

  setupCategoryClicks() {
      const categoryCards = document.querySelectorAll('.category-card');
      
      categoryCards.forEach(card => {
          card.addEventListener('click', () => {
              const category = card.dataset.category;
              this.filterProducts(category);
              
          
              document.getElementById('products')?.scrollIntoView({ 
                  behavior: 'smooth' 
              });
          });
      });
  }

  setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('fade-in');
              }
          });
      }, {
          threshold: 0.1
      });


      document.querySelectorAll('.category-card, .product-card, .feature-card').forEach(el => {
          observer.observe(el);
      });
  }

  loadProducts() {

      this.products = [
          {
              id: 1,
              name: "سرویس غذاخوری 12 نفره",
              price: 3200000,
              originalPrice: 3800000,
              image: "https://images.unsplash.com/photo-1617196032261-9f3ee8b05bda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
              category: "dinnerware",
              isNew: true,
              isBestseller: true,
              discount: 15,
              description: "سرویس غذاخوری 12 نفره با طراحی مدرن و کیفیت عالی، مناسب برای مهمانی‌ها و مجالس خاص"
          },
          {
              id: 2,
              name: "سرویس پذیرایی 6 نفره",
              price: 1200000,
              originalPrice: 1500000,
              image: "https://images.unsplash.com/photo-1602524818420-bbdb199d3c3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
              category: "serving",
              isNew: false,
              isBestseller: true,
              discount: 20,
              description: "سرویس پذیرایی 6 نفره با طراحی شیک و مدرن، مناسب برای پذیرایی از مهمانان"
          },
          {
              id: 3,
              name: "ست فنجان و نعلبکی",
              price: 450000,
              originalPrice: 520000,
              image: "https://images.unsplash.com/photo-1594007658337-f6d5d88d3ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
              category: "cups",
              isNew: true,
              isBestseller: false,
              discount: 13,
              description: "ست فنجان و نعلبکی با طراحی کلاسیک، مناسب برای چای خوری و پذیرایی"
          },
          {
              id: 4,
              name: "لیوان شیشه ای لوکس",
              price: 280000,
              originalPrice: 320000,
              image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
              category: "cups",
              isNew: false,
              isBestseller: true,
              discount: 12,
              description: "لیوان شیشه ای لوکس با طراحی مدرن، مناسب برای نوشیدنی‌های سرد و گرم"
          },
          {
              id: 5,
              name: "بشقاب سرو لوکس",
              price: 180000,
              originalPrice: 220000,
              image: "https://images.unsplash.com/photo-1587332278433-9742a81a2d68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
              category: "serving",
              isNew: true,
              isBestseller: false,
              discount: 18,
              description: "بشقاب سرو لوکس با طراحی منحصر به فرد، مناسب برای سرو غذاهای ویژه"
          },
          {
              id: 6,
              name: "سرویس چای خوری",
              price: 890000,
              originalPrice: 1050000,
              image: "https://images.unsplash.com/photo-1594736797933-d0ffd0d52b5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
              category: "sets",
              isNew: false,
              isBestseller: true,
              discount: 15,
              description: "سرویس چای خوری کامل با 6 فنجان، مناسب برای مهمانی‌های کوچک و خانوادگی"
          },
          {
              id: 7,
              name: "پارچ دکوراتیو",
              price: 320000,
              originalPrice: 380000,
              image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
              category: "serving",
              isNew: true,
              isBestseller: false,
              discount: 15,
              description: "پارچ دکوراتیو شیشه‌ای با طراحی مدرن، مناسب برای سرو نوشیدنی‌ها"
          },
          {
              id: 8,
              name: "شکرپاش کریستالی",
              price: 150000,
              originalPrice: 180000,
              image: "https://images.unsplash.com/photo-1587332278433-9742a81a2d68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
              category: "serving",
              isNew: false,
              isBestseller: true,
              discount: 16,
              description: "شکرپاش کریستالی با طراحی زیبا، مناسب برای میزهای پذیرایی"
          }
      ];

      this.renderProducts(this.products);
  }

  renderProducts(products) {
      const productsGrid = document.getElementById('productsGrid');
      if (!productsGrid) return;

      productsGrid.innerHTML = '';

      products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.className = 'product-card';
          productCard.innerHTML = this.getProductCardHTML(product);
          productsGrid.appendChild(productCard);
      });


      this.attachProductEventListeners();
  }

  getProductCardHTML(product) {
      const discountBadge = product.discount ? 
          `<div class="product-badge">${product.discount}% تخفیف</div>` : '';
      
      const newBadge = product.isNew ? 
          `<div class="product-badge" style="background: #10b981;">جدید</div>` : '';
      
      const bestsellerBadge = product.isBestseller ? 
          `<div class="product-badge" style="background: #3b82f6;">پرفروش</div>` : '';

      const originalPrice = product.originalPrice ? 
          `<span class="original-price">${this.formatPrice(product.originalPrice)}</span>` : '';

      return `
          ${discountBadge}
          ${newBadge}
          ${bestsellerBadge}
          <div class="product-image" onclick="chinaShop.openProductModal(${product.id})">
              <img src="${product.image}" alt="${product.name}">
              <div class="product-overlay">
                  <button class="quick-view-btn">مشاهده سریع</button>
              </div>
          </div>
          <div class="product-info">
              <h3 class="product-title">${product.name}</h3>
              <div class="product-price">
                  <span class="current-price">${this.formatPrice(product.price)}</span>
                  ${originalPrice}
              </div>
              <div class="product-actions">
                  <button class="add-to-cart" onclick="chinaShop.addToCart(chinaShop.products.find(p => p.id === ${product.id}))">
                      <i class="fas fa-shopping-cart"></i>
                      افزودن به سبد
                  </button>
                  <button class="wishlist-btn" onclick="chinaShop.toggleWishlistItem(chinaShop.products.find(p => p.id === ${product.id}))">
                      <i class="far fa-heart"></i>
                  </button>
              </div>
          </div>
      `;
  }

  getProductModalContent(product) {
      const originalPrice = product.originalPrice ? 
          `<span class="original-price">${this.formatPrice(product.originalPrice)}</span>` : '';

      return `
          <div class="product-modal-content">
              <div class="product-modal-image">
                  <img src="${product.image}" alt="${product.name}">
              </div>
              <div class="product-modal-details">
                  <h2>${product.name}</h2>
                  <p class="product-modal-description">${product.description}</p>
                  <div class="product-modal-price">
                      <span class="current-price">${this.formatPrice(product.price)} تومان</span>
                      ${originalPrice}
                  </div>
                  <div class="product-modal-features">
                      <h4>ویژگی‌ها:</h4>
                      <ul>
                          <li>جنس: چینی مرغوب</li>
                          <li>قابل استفاده در ماشین ظرفشویی</li>
                          <li>مناسب برای مایکروویو</li>
                          <li>طراحی ضد خش</li>
                          <li>گارانتی 2 ساله</li>
                      </ul>
                  </div>
                  <div class="product-modal-actions">
                      <button class="btn btn-primary add-to-cart" onclick="chinaShop.addToCart(chinaShop.products.find(p => p.id === ${product.id})); chinaShop.closeProductModal()">
                          <i class="fas fa-shopping-cart"></i>
                          افزودن به سبد خرید
                      </button>
                      <button class="btn btn-outline wishlist-btn" onclick="chinaShop.toggleWishlistItem(chinaShop.products.find(p => p.id === ${product.id}))">
                          <i class="far fa-heart"></i>
                          افزودن به علاقه‌مندی‌ها
                      </button>
                  </div>
              </div>
          </div>
      `;
  }

  attachProductEventListeners() {
  
      document.querySelectorAll('.quick-view-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const productCard = e.target.closest('.product-card');
              const productId = this.getProductIdFromCard(productCard);
              const product = this.products.find(p => p.id === productId);
              if (product) {
                  this.openProductModal(product);
              }
          });
      });
  }

  getProductIdFromCard(productCard) {

   
      const productName = productCard.querySelector('.product-title').textContent;
      const product = this.products.find(p => p.name === productName);
      return product ? product.id : null;
  }

  showAddToCartAnimation() {
      const animation = document.createElement('div');
      animation.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--primary-color);
          color: white;
          padding: 20px 30px;
          border-radius: 10px;
          z-index: 10000;
          animation: fadeInOut 2s ease-in-out;
      `;
      animation.textContent = '✓ به سبد خرید اضافه شد';
      document.body.appendChild(animation);

      setTimeout(() => {
          animation.remove();
      }, 2000);
  }

  formatPrice(price) {
      return new Intl.NumberFormat('fa-IR').format(price);
  }

  toggleMobileMenu() {
      const navMenu = document.querySelector('.nav-menu');
      navMenu?.classList.toggle('active');
  }

  animateOnScroll() {
      const elements = document.querySelectorAll('.category-card, .product-card, .feature-card');
      
      elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementTop < windowHeight - 100) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  }
}


const chinaShop = new ChinaShop();


const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInOut {
      0% { opacity: 0; transform: translate(-50%, -60%); }
      50% { opacity: 1; transform: translate(-50%, -50%); }
      100% { opacity: 0; transform: translate(-50%, -40%); }
  }
`;
document.head.appendChild(style);


window.chinaShop = chinaShop;

function closeCart() {
  chinaShop.closeCart();
}

window.addEventListener('error', (e) => {
  console.error('خطا در اپلیکیشن:', e.error);
});


window.addEventListener('unhandledrejection', (e) => {
  console.error('Promise rejection:', e.reason);
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
          .then(registration => {
              console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
          });
  });
}
